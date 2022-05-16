import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PublicKey } from '@solana/web3.js';
import { BN } from '@project-serum/anchor';

export interface ISolanaWallet {
  address: PublicKey;
  balance: BN;
  //
  count: number;
}

export const initialState: ISolanaWallet = {
  address: new PublicKey(0),
  balance: new BN(0),
  //
  count: 0
};

export const solanaWalletSliceName = 'solanaWallet';
const solanaWalletSlice = createSlice({
  name: solanaWalletSliceName,
  initialState,
  reducers: {
    resetState() {
      return initialState;
    },
    setAddress(state, action: PayloadAction<PublicKey>) {
      state.address = action.payload;
      return state;
    },
    setBalance(state, action: PayloadAction<BN>) {
      state.balance = action.payload;
      return state;
    },
    //
    setCount(state, action: PayloadAction<number>) {
      state.count = action.payload;
      return state;
    }
  }
});

export const solanaWalletActions = solanaWalletSlice.actions;
export const solanaWalletReducer = solanaWalletSlice.reducer;
