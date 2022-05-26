import React, { FC } from 'react';
import { ITweet } from '@/models/tweet';
import { BN } from '@project-serum/anchor';
import moment from 'moment';
import { truncateStr } from '@/utils/helpers';

export interface TweetCardProps {
  tweet: ITweet;
}

const TweetCard: FC<TweetCardProps> = ({ tweet }) => {
  const formatDate = (timestamp: BN): string => {
    return moment(timestamp.toNumber() * 1000).format('Do MMM YYYY, HH:mm');
  };

  return (
    <div className="px-8 py-4">
      <div className="mb-2 flex justify-between">
        <span className="text-blue-500">{truncateStr(tweet.author.toBase58())}</span>
        <span className="text-gray-400 text-sm">{formatDate(tweet.timestamp)}</span>
      </div>
      <p>{tweet.content}</p>
    </div>
  );
};

export default TweetCard;
