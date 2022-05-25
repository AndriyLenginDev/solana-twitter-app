import { all, put, spawn, takeLeading, call } from 'typed-redux-saga';
import { tweetsActions } from '@/store/reducers/tweets';
import TweetsService from '@/web3';
import { ITweet } from '@/models/tweet';

const getTweets = async (filters = []): Promise<ITweet[]> => {
  return await TweetsService.getTweets(filters);
};

export function* handleGetTweets(): Generator {
  yield put(tweetsActions.setLoading(true));
  const tweets = yield call(getTweets);
  yield put(tweetsActions.setTweets(tweets as ITweet[]));
  yield put(tweetsActions.setLoading(false));
}

export function* watchGetTweets(): Generator {
  yield takeLeading(tweetsActions.getTweets, handleGetTweets);
}

export function* tweetsSaga(): Generator {
  yield all([watchGetTweets].map(spawn));
}
