import { all, put, spawn, takeLeading, call, select } from 'typed-redux-saga';
import { tweetsActions } from '@/store/reducers/tweets';
import {
  IAddTweetAction,
  IDeleteTweetAction,
  IGetTweetsAction,
  IGetTweetsNextPageAction
} from '@/store/reducers/tweets/types';
import { deleteTweet } from '@/web3';
import { ITweet } from '@/models/tweet';
import {
  hasNextPage,
  selectFilter,
  selectLimit,
  selectPage,
  selectSortedTweets,
  selectTweets
} from '@/store/reducers/tweets/selectors';
import { getTweetsPage, prefetchTweets } from '@/web3/pagination';
import { MemcmpFilter, PublicKey } from '@solana/web3.js';

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

export function* tweetsSaga(): Generator {
  yield all([watchGetTweets, watchAddTweet, watchDeleteTweet, watchGetTweetsNextPage].map(spawn));
}
