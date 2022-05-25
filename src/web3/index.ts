import { getAppProgram } from '@/hooks/useAppProgram';
import { ITweet, Tweet } from '@/models/tweet';

export default class TweetsService {
  // public static async getTweets(filters = []): Promise<ITweet[]> {
  //   const { program } = getAppProgram();
  //
  //   const tweets = await program.account.tweet.all(filters);
  //   return tweets.map((tweet) => new Tweet(tweet.publicKey, tweet.account));
  // }

  public static async getTweets(filters = []): Promise<ITweet[]> {
    return new Promise((res) => setTimeout(res.bind(null, []), 1000));
  }
}
