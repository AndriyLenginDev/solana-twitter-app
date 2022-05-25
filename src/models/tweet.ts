import { PublicKey } from '@solana/web3.js';

export interface ITweet {
  publicKey: PublicKey;
  key: string;
  timestamp: number;
}

export class Tweet implements ITweet {
  public timestamp: number = 0;

  constructor(public publicKey: PublicKey, accountData: any) {}

  get key() {
    return this.publicKey.toBase58();
  }
}
