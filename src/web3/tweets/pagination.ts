import { getAppProgram } from '@/hooks/useAppProgram';
import { BN } from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';
import { ITweet, Tweet } from '@/models/tweet';

export const prefetchTweets = async (filters: any[] = []): Promise<PublicKey[]> => {
  const { connection, program } = getAppProgram();

  const tweetClient = program.account.tweet;
  // @ts-ignore
  const tweetAccountName = tweetClient._idlAccount.name;
  // Prepare the discriminator filter.
  const tweetDiscriminatorFilter = {
    memcmp: tweetClient.coder.accounts.memcmp(tweetAccountName)
  };

  // Data slice to fetch only timestamp
  const timestampSlice = { offset: 40, length: 8 };

  // Prefetch all tweets with their timestamps only.
  const allTweets = await connection.getProgramAccounts(program.programId, {
    filters: [tweetDiscriminatorFilter, ...filters],
    dataSlice: timestampSlice
  });

  // Parse the timestamp from the account's data.
  const allTweetsWithTimestamps = allTweets.map(({ account, pubkey }) => ({
    pubkey,
    timestamp: new BN(account.data, 'le')
  }));

  return allTweetsWithTimestamps
    .sort((a, b) => b.timestamp.cmp(a.timestamp))
    .map(({ pubkey }) => pubkey);
};

export const getTweetsPage = async (
  publicKeys: PublicKey[],
  page: number,
  limit: number
): Promise<any> => {
  const paginatedPublicKeys = publicKeys.slice((page - 1) * limit, page * limit);

  if (paginatedPublicKeys.length === 0) {
    return [];
  }

  const { program } = getAppProgram();

  const tweets = await program.account.tweet.fetchMultiple(paginatedPublicKeys);

  return tweets.reduce((acc: ITweet[], tweet, index) => {
    const publicKey = paginatedPublicKeys[index];
    acc.push(new Tweet(publicKey, tweet));
    return acc;
  }, []);
};
