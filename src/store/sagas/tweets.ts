import { all, put, spawn, takeLeading, call } from 'typed-redux-saga';
import { tweetsActions } from '@/store/reducers/tweets';
import { IGetTweetsAction } from '@/store/reducers/tweets/types';
import { getTweets } from '@/web3';
import { ITweet } from '@/models/tweet';

export function* handleGetTweets(action: IGetTweetsAction): Generator {
  yield put(tweetsActions.setLoading(true));
  const tweets = (yield call(getTweets, action.payload)) as ITweet[];
  yield put(tweetsActions.setTweets(tweets));
  yield put(tweetsActions.setLoading(false));
}

export function* watchGetTweets(): Generator {
  yield takeLeading(tweetsActions.getTweets, handleGetTweets);
}

export function* tweetsSaga(): Generator {
  yield all([watchGetTweets].map(spawn));
}
