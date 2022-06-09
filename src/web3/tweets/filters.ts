import bs58 from 'bs58';
import { MemcmpFilter } from '@solana/web3.js';

export const authorFilter = (authorBase58PublicKey: string): MemcmpFilter => ({
  memcmp: {
    offset: 8, // Discriminator.
    bytes: authorBase58PublicKey
  }
});

export const topicFilter = (topic: string): MemcmpFilter => ({
  memcmp: {
    offset:
      8 + // Discriminator.
      32 + // Author public key.
      8 + // Timestamp.
      4, // Topic string prefix.
    bytes: bs58.encode(Buffer.from(topic))
  }
});
