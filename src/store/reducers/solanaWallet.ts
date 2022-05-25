import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PublicKey } from '@solana/web3.js';
import { BN } from '@project-serum/anchor';

export interface ISolanaWalletState {
  connected: boolean;
  address: PublicKey;
  balance: BN;
}

export const initialState: ISolanaWalletState = {
  connected: false,
  address: new PublicKey(0),
  balance: new BN(0)
};

export const solanaWalletSliceName = 'solanaWallet';
const solanaWalletSlice = createSlice({
  name: solanaWalletSliceName,
  initialState,
  reducers: {
    resetState() {
      return initialState;
    },
    setConnected(state, action: PayloadAction<boolean>) {
      state.connected = action.payload;
      return state;
    },
    setAddress(state, action: PayloadAction<PublicKey>) {
      state.address = action.payload;
      return state;
    },
    setBalance(state, action: PayloadAction<BN>) {
      state.balance = action.payload;
      return state;
    }
  }
});

export const solanaWalletActions = solanaWalletSlice.actions;
export const solanaWalletReducer = solanaWalletSlice.reducer;
