import { MemcmpFilter } from '@solana/web3.js';

export const tweetFilter = (tweetBase58PublicKey: string): MemcmpFilter => ({
  memcmp: {
    offset:
      8 + // Discriminator.
      32 + // Author public key.
      8, // Timestamp.
    bytes: tweetBase58PublicKey
  }
});

export const authorFilter = (authorBase58PublicKey: string): MemcmpFilter => ({
  memcmp: {
    offset: 8, // Discriminator.
    bytes: authorBase58PublicKey
  }
});
