import { combineReducers } from 'redux';
import { solanaWalletReducer, solanaWalletSliceName } from '@/store/reducers/solanaWallet';

export const rootReducer = combineReducers({
  [solanaWalletSliceName]: solanaWalletReducer
});
