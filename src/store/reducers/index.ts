import { combineReducers } from 'redux';
import { tweetsReducer, tweetsSliceName } from '@/store/reducers/tweets';
import { walletReducer, walletSliceName } from '@/store/reducers/wallet';

export const rootReducer = combineReducers({
  [tweetsSliceName]: tweetsReducer,
  [walletSliceName]: walletReducer
});
