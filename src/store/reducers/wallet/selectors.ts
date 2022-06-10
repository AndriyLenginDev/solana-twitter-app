import { RootState } from '@/store';
import { PublicKey } from '@solana/web3.js';

export const selectWallet = (state: RootState): PublicKey | null | undefined => state.wallet.publicKey;
