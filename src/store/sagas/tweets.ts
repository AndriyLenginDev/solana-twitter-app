import { all, put, spawn, takeLeading, call, select } from 'typed-redux-saga';
import { tweetsActions } from '@/store/reducers/tweets';
import { IGetTweetsAction, ISendTweetAction } from '@/store/reducers/tweets/types';
import { getTweets, sendTweet } from '@/web3';
import { ITweet } from '@/models/tweet';
import { RootState } from '@/store';

export function* handleGetTweets(action: IGetTweetsAction): Generator {
  yield put(tweetsActions.setTweetsLoading(true));
  const tweets = (yield call(getTweets, action.payload)) as ITweet[];
  yield put(tweetsActions.setTweets(tweets));
  yield put(tweetsActions.setTweetsLoading(false));
}

export function* handleSendTweet({ payload }: ISendTweetAction): Generator {
  yield put(tweetsActions.setSendLoading(true));
  const tweet = (yield call(sendTweet, payload.content, payload.topic)) as ITweet;
  const tweets = (yield select((state: RootState) => state.tweets.tweets)) as ITweet[];
  yield put(tweetsActions.setTweets([tweet, ...tweets]));
  yield put(tweetsActions.setSendLoading(false));
}

export function* watchGetTweets(): Generator {
  yield takeLeading(tweetsActions.getTweets, handleGetTweets);
}

export function* watchSendTweet(): Generator {
  yield takeLeading(tweetsActions.sendTweet, handleSendTweet);
}

export function* tweetsSaga(): Generator {
  yield all([watchGetTweets, watchSendTweet].map(spawn));
}
