import { PublicKey } from '@solana/web3.js';
import { BN } from '@project-serum/anchor';

export interface ILike {
  publicKey: PublicKey;
  author: PublicKey;
  tweetPubkey: PublicKey;
  timestamp: BN;
  key: string;
}

export class Like implements ILike {
  public author: PublicKey;
  public tweetPubkey: PublicKey;
  public timestamp: BN;

  constructor(public publicKey: PublicKey, accountData: any) {
    this.author = accountData.author;
    this.tweetPubkey = accountData.tweetPubkey;
    this.timestamp = accountData.timestamp;
  }

  get key() {
    return this.publicKey.toBase58();
  }
}
