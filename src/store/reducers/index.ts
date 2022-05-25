import { combineReducers } from 'redux';
import { solanaWalletReducer, solanaWalletSliceName } from '@/store/reducers/solanaWallet';
import { tweetsReducer, tweetsSliceName } from '@/store/reducers/tweets';

export const rootReducer = combineReducers({
  [solanaWalletSliceName]: solanaWalletReducer,
  [tweetsSliceName]: tweetsReducer
});
