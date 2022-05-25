import React, { FC } from 'react';
import { ITweet } from '@/models/tweet';
import Loading from '@/components/Loading';
import TweetCard from '@/components/TweetCard/TweetCard';

export interface TweetListProps {
  tweets: ITweet[];
  loading: boolean;
}

const TweetList: FC<TweetListProps> = ({ tweets, loading }) => {
  return (
    <div className="divide-y">
      {tweets.map((tweet) => (
        <TweetCard
          tweet={tweet}
          key={tweet.key}
        />
      ))}
      {loading && <Loading />}
    </div>
  );
};

export default TweetList;
