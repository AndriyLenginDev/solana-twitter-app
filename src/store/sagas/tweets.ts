import { all, put, spawn, takeLeading, call } from 'typed-redux-saga';
import { PayloadAction } from '@reduxjs/toolkit';
import { tweetsActions } from '@/store/reducers/tweets';
import { ITweet } from '@/models/tweet';
import { getTweets } from '@/web3';

export function* handleGetTweets(action: PayloadAction<any[] | undefined>): Generator {
  yield put(tweetsActions.setLoading(true));
  const tweets = yield call(getTweets, action.payload);
  yield put(tweetsActions.setTweets(tweets as ITweet[]));
  yield put(tweetsActions.setLoading(false));
}

export function* watchGetTweets(): Generator {
  yield takeLeading(tweetsActions.getTweets, handleGetTweets);
}

export function* tweetsSaga(): Generator {
  yield all([watchGetTweets].map(spawn));
}
