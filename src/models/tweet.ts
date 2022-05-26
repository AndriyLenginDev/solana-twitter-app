import { PublicKey } from '@solana/web3.js';
import { BN } from '@project-serum/anchor';

export interface ITweet {
  publicKey: PublicKey;
  key: string;
  author: PublicKey;
  timestamp: BN;
  content: string;
  topic?: string;
}

export class Tweet implements ITweet {
  public author: PublicKey;
  public timestamp: BN;
  public content: string;
  public topic: string;

  constructor(public publicKey: PublicKey, accountData: any) {
    this.author = accountData.author;
    this.timestamp = accountData.timestamp;
    this.content = accountData.content;
    this.topic = accountData.topic;
  }

  get key() {
    return this.publicKey.toBase58();
  }
}
