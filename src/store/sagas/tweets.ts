import { all, put, spawn, takeLeading, call, select } from 'typed-redux-saga';
import { tweetsActions } from '@/store/reducers/tweets';
import {
  IDeleteTweetAction,
  IGetTweetsAction,
  IGetTweetsNextPageAction
} from '@/store/reducers/tweets/types';
import { deleteTweet, getTweets } from '@/web3';
import { ITweet } from '@/models/tweet';
import { selectPage, selectTweets } from '@/store/reducers/tweets/selectors';

export function* handleGetTweets(action: IGetTweetsAction): Generator {
  try {
    yield put(tweetsActions.setLoading(true));
    const tweets = (yield call(getTweets, action.payload)) as ITweet[];
    yield put(tweetsActions.setTweets(tweets));
  } catch (error) {
    console.error(error);
  } finally {
    yield put(tweetsActions.setLoading(false));
  }
}

export function* handleDeleteTweet(action: IDeleteTweetAction): Generator {
  try {
    yield call(deleteTweet, action.payload);
    const tweets = (yield select(selectTweets)) as ITweet[];
    const filteredTweets = tweets.filter((tweet) => tweet.key !== action.payload.key);
    yield put(tweetsActions.setTweets(filteredTweets));
  } catch (error) {
    console.error(error);
  }
}

export function* handleGetTweetsNextPage(action: IGetTweetsNextPageAction): Generator {
  try {
    // action.payload - filters
    yield put(tweetsActions.setLoading(true));
    const page = (yield select(selectPage)) as number;
    console.log(page + 1);
    // const tweets = (yield call(getTweets, action.payload)) as ITweet[];
    yield put(tweetsActions.setPage(page + 1));
  } catch (error) {
    console.error(error);
  } finally {
    yield put(tweetsActions.setLoading(false));
  }
}

export function* watchGetTweets(): Generator {
  yield takeLeading(tweetsActions.getTweets, handleGetTweets);
}

export function* watchDeleteTweet(): Generator {
  yield takeLeading(tweetsActions.deleteTweet, handleDeleteTweet);
}

export function* watchGetTweetsNextPage(): Generator {
  yield takeLeading(tweetsActions.getTweetsNextPage, handleGetTweetsNextPage);
}

export function* tweetsSaga(): Generator {
  yield all([watchGetTweets, watchDeleteTweet, watchGetTweetsNextPage].map(spawn));
}
