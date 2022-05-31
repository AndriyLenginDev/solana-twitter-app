import { getAppProgram } from '@/hooks/useAppProgram';
import { ITweet, Tweet } from '@/models/tweet';
import { web3 } from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';

export const getTweets = async (filters: any[] = []): Promise<ITweet[]> => {
  const { program } = getAppProgram();

  const tweets = await program.account.tweet.all(filters);
  return tweets.map((tweet) => new Tweet(tweet.publicKey, tweet.account));
};

export const getTweet = async (publicKey: PublicKey): Promise<ITweet> => {
  const { program } = getAppProgram();

  const account = await program.account.tweet.fetch(publicKey);
  return new Tweet(publicKey, account);
};

export const sendTweet = async (content: string, topic: string = ''): Promise<ITweet> => {
  const { wallet, program } = getAppProgram();
  const tweet = web3.Keypair.generate();

  await program.rpc.sendTweet(topic, content, {
    accounts: {
      author: wallet.publicKey,
      tweet: tweet.publicKey,
      systemProgram: web3.SystemProgram.programId
    },
    signers: [tweet]
  });

  const tweetAccount = await program.account.tweet.fetch(tweet.publicKey);
  return new Tweet(tweet.publicKey, tweetAccount);
};
