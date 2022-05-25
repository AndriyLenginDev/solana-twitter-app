import { all, spawn } from 'typed-redux-saga';
import { tweetsSaga } from '@/store/sagas/tweets';

export default function* rootSaga() {
  yield all([tweetsSaga].map(spawn));
}
