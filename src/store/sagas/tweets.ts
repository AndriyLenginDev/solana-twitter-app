import { all, put, spawn, takeLeading, call, select, fork, takeLatest } from 'typed-redux-saga';
import { tweetsActions } from '@/store/reducers/tweets';
import {
  IAddLikeAction,
  IAddTweetAction,
  IDeleteTweetAction,
  IGetTweetsAction,
  IGetTweetsNextPageAction,
  ISetTweetsAction
} from '@/store/reducers/tweets/types';
import { deleteTweet } from '@/web3/tweets';
import { ITweet, Tweet } from '@/models/tweet';
import { ILike } from '@/models/like';
import {
  hasNextPage,
  selectFilter,
  selectLimit,
  selectPage,
  selectSortedTweets,
  selectTweet,
  selectTweets
} from '@/store/reducers/tweets/selectors';
import { getTweetsPage, prefetchTweets } from '@/web3/tweets/pagination';
import { MemcmpFilter, PublicKey } from '@solana/web3.js';
import {addLike, deleteLike, getLikes, prefetchLikes} from '@/web3/likes';
import { authorFilter, tweetFilter } from '@/web3/likes/filters';
import { shallowClone } from '@/utils/helpers';
import { selectWallet } from '@/store/reducers/wallet/selectors';

export function* prefetchTweetLikesCount(tweet: ITweet): Generator {
  try {
    const likes = (yield call(prefetchLikes, [tweetFilter(tweet.key)])) as number;
    if (likes !== tweet.likes) {
      const current = (yield select(selectTweet(tweet.publicKey))) as Tweet;
      const copy = shallowClone<ITweet>(current, { likes });
      yield put(tweetsActions.updateTweet(copy));
    }
  } catch (error) {
    console.error(error);
  }
}

export function* prefetchTweetPersonalLike(tweet: ITweet): Generator {
  try {
    const publicKey = (yield select(selectWallet)) as PublicKey;
    if (publicKey) {
      const [personalLikeAcc] = (yield call(getLikes, [
        tweetFilter(tweet.key),
        authorFilter(publicKey.toBase58())
      ])) as ILike[];
      if (personalLikeAcc) {
        const current = (yield select(selectTweet(tweet.publicKey))) as Tweet;
        const copy = shallowClone<ITweet>(current, { personalLike: personalLikeAcc.publicKey });
        yield put(tweetsActions.updateTweet(copy));
      }
    } else if (tweet.personalLike) {
      const copy = shallowClone<ITweet>(tweet, { personalLike: null });
      yield put(tweetsActions.updateTweet(copy));
    }
  } catch (error) {
    console.error(error);
  }
}

export function* prefetchTweetLikes(tweet: ITweet): Generator {
  yield all([
    //
    call(prefetchTweetLikesCount, tweet),
    call(prefetchTweetPersonalLike, tweet)
  ]);
}

export function* handleGetTweets(action: IGetTweetsAction): Generator {
  try {
    yield put(tweetsActions.setLoading(true));
    yield put(tweetsActions.setFilter(action.payload || []));
    const publicKeys = (yield call(prefetchTweets, action.payload)) as PublicKey[];
    yield put(tweetsActions.setTotal(publicKeys.length));
    const page = 1;
    yield put(tweetsActions.setPage(page));
    const limit = (yield select(selectLimit)) as number;
    const tweets = (yield call(getTweetsPage, publicKeys, page, limit)) as ITweet[];
    yield put(tweetsActions.setTweets(tweets));
  } catch (error) {
    console.error(error);
  } finally {
    yield put(tweetsActions.setLoading(false));
  }
}

export function* handleAddTweet(action: IAddTweetAction): Generator {
  try {
    const nextPage = (yield select(hasNextPage)) as boolean;
    if (nextPage) {
      const sortedPublicKeys = ((yield select(selectSortedTweets)) as ITweet[]).map(
        (tweet) => tweet.publicKey
      );
      const publicKeys = [...sortedPublicKeys.slice(0, -1), action.payload.publicKey];
      const limit = publicKeys.length;
      const tweets = (yield call(getTweetsPage, publicKeys, 1, limit)) as ITweet[];
      yield put(tweetsActions.setTweets(tweets));
    } else {
      yield put(tweetsActions.addTweets([action.payload]));
    }
  } catch (error) {
    console.error(error);
  }
}

export function* handleDeleteTweet(action: IDeleteTweetAction): Generator {
  try {
    yield call(deleteTweet, action.payload);
    const nextPage = (yield select(hasNextPage)) as boolean;
    if (nextPage) {
      const filter = (yield select(selectFilter)) as MemcmpFilter[];
      const currentTweets = (yield select(selectTweets)) as ITweet[];
      const limit = currentTweets.length;
      const publicKeys = (yield call(prefetchTweets, filter)) as PublicKey[];
      const tweets = (yield call(getTweetsPage, publicKeys, 1, limit)) as ITweet[];
      yield put(tweetsActions.setTweets(tweets));
    } else {
      const tweets = (yield select(selectTweets)) as ITweet[];
      const filteredTweets = tweets.filter((tweet) => tweet.key !== action.payload.key);
      yield put(tweetsActions.setTweets(filteredTweets));
    }
  } catch (error) {
    console.error(error);
  }
}

export function* handleGetTweetsNextPage(action: IGetTweetsNextPageAction): Generator {
  try {
    const nextPage = (yield select(hasNextPage)) as boolean;
    if (nextPage) {
      yield put(tweetsActions.setLoading(true));
      const publicKeys = (yield call(prefetchTweets, action.payload)) as PublicKey[];
      yield put(tweetsActions.setTotal(publicKeys.length));
      const currentPage = (yield select(selectPage)) as number;
      const page = currentPage + 1;
      yield put(tweetsActions.setPage(page));
      const limit = (yield select(selectLimit)) as number;
      const tweets = (yield call(getTweetsPage, publicKeys, page, limit)) as ITweet[];
      yield put(tweetsActions.addTweets(tweets));
    }
  } catch (error) {
    console.error(error);
  } finally {
    yield put(tweetsActions.setLoading(false));
  }
}

export function* handleNewTweets(action: ISetTweetsAction): Generator {
  if (action.payload?.length) {
    yield all(action.payload.map((tweet) => fork(prefetchTweetLikes, tweet)));
  }
}

export function* handleAddLike({ payload: tweet }: IAddLikeAction): Generator {
  if (!tweet.personalLike) {
    const like = (yield call(addLike, tweet.publicKey)) as ILike;
    const copy = shallowClone<ITweet>(tweet, {
      personalLike: like.publicKey,
      likes: tweet.likes ? tweet.likes + 1 : 1
    });
    yield put(tweetsActions.updateTweet(copy));
  }
}

export function* handleRemoveLike({ payload: tweet }: IAddLikeAction): Generator {
  if (tweet.personalLike) {
    yield call(deleteLike, tweet.personalLike);
    const copy = shallowClone<ITweet>(tweet, {
      personalLike: null,
      likes: tweet.likes ? tweet.likes - 1 : 0
    });
    yield put(tweetsActions.updateTweet(copy));
  }
}

export function* watchGetTweets(): Generator {
  yield takeLeading(tweetsActions.getTweets, handleGetTweets);
}

export function* watchAddTweet(): Generator {
  yield takeLeading(tweetsActions.addTweet, handleAddTweet);
}

export function* watchDeleteTweet(): Generator {
  yield takeLeading(tweetsActions.deleteTweet, handleDeleteTweet);
}

export function* watchGetTweetsNextPage(): Generator {
  yield takeLeading(tweetsActions.getTweetsNextPage, handleGetTweetsNextPage);
}

export function* watchNewTweets(): Generator {
  yield takeLatest([tweetsActions.addTweets, tweetsActions.setTweets], handleNewTweets);
}

export function* watchAddLike(): Generator {
  yield takeLeading(tweetsActions.addLike, handleAddLike);
}

export function* watchRemoveLike(): Generator {
  yield takeLeading(tweetsActions.removeLike, handleRemoveLike);
}

export function* tweetsSaga(): Generator {
  yield all(
    [
      watchGetTweets,
      watchAddTweet,
      watchDeleteTweet,
      watchGetTweetsNextPage,
      watchNewTweets,
      watchAddLike,
      watchRemoveLike
    ].map(spawn)
  );
}
