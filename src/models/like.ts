import { PublicKey } from '@solana/web3.js';

export interface ILike {
  author: PublicKey;
}

export class Like implements ILike {
  constructor(public author: PublicKey) {}
}
