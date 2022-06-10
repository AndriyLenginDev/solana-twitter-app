import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PublicKey } from '@solana/web3.js';

export interface IWalletState {
  publicKey?: PublicKey | null;
}

export const initialState: IWalletState = {
  publicKey: null
};

export const walletSliceName = 'wallet';
const walletSlice = createSlice({
  name: walletSliceName,
  initialState,
  reducers: {
    resetState() {
      return initialState;
    },
    setPublicKey(state, action: PayloadAction<PublicKey | null>) {
      state.publicKey = action.payload;
      return state;
    }
  }
});

export const walletActions = walletSlice.actions;
export const walletReducer = walletSlice.reducer;
