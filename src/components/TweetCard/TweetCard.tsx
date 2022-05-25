import React, { FC } from 'react';
import { ITweet } from '@/models/tweet';

export interface TweetCardProps {
  tweet: ITweet;
}

const TweetCard: FC<TweetCardProps> = () => {
  return <div></div>;
};

export default TweetCard;
