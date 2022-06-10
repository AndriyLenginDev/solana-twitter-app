import { all, spawn } from 'typed-redux-saga';
import { walletSaga } from '@/store/sagas/wallet';
import { tweetsSaga } from '@/store/sagas/tweets';

export default function* rootSaga() {
  yield all([walletSaga, tweetsSaga].map(spawn));
}
