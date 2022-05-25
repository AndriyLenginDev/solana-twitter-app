import { PublicKey } from '@solana/web3.js';

export interface ITweet {
  publicKey: PublicKey;
}

export class Tweet implements ITweet {
  constructor(public publicKey: PublicKey) {}

  get key() {
    return this.publicKey.toBase58();
  }
}
