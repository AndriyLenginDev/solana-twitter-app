import { all, fork, select, spawn, takeLatest } from 'typed-redux-saga';
import { walletActions } from '@/store/reducers/wallet';
import { PayloadAction } from '@reduxjs/toolkit';
import { PublicKey } from '@solana/web3.js';
import { selectTweets } from '@/store/reducers/tweets/selectors';
import { ITweet } from '@/models/tweet';
import { prefetchTweetPersonalLike } from '@/store/sagas/tweets';

export function* handlePublicKey(action: PayloadAction<PublicKey | null>) {
  const tweets = (yield select(selectTweets)) as ITweet[];
  if (tweets?.length) {
    yield all(tweets.map((tweet) => fork(prefetchTweetPersonalLike, tweet)));
  }
}

export function* watchPublicKey(): Generator {
  yield takeLatest(walletActions.setPublicKey, handlePublicKey);
}

export function* walletSaga(): Generator {
  yield all([watchPublicKey].map(spawn));
}
