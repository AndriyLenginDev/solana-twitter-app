import { getAppProgram } from '@/hooks/useAppProgram';
import { ITweet, Tweet } from '@/models/tweet';

// export const getTweets = async (filters: any[] = []): Promise<ITweet[]> => {
//   const { program } = getAppProgram();
//
//   const tweets = await program.account.tweet.all(filters);
//   return tweets.map((tweet) => new Tweet(tweet.publicKey, tweet.account));
// };

export const getTweets = async (filters: any[] = []): Promise<ITweet[]> => {
  return new Promise((res) => setTimeout(res.bind(null, []), 1000));
};
