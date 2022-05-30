import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { ITweet } from '@/models/tweet';
import { BN } from '@project-serum/anchor';
import moment from 'moment';
import { truncateStr } from '@/utils/helpers';
import { PublicKey } from '@solana/web3.js';
import { RoutePaths } from '@/router';

export interface TweetCardProps {
  tweet: ITweet;
}

const TweetCard: FC<TweetCardProps> = ({ tweet }) => {
  const formatDate = (timestamp: BN): string => {
    // TODO: show "fromNow" only if tweet was posted less than 1 day ago
    // return moment(timestamp.toNumber() * 1000).format('Do MMM YYYY, HH:mm');
    return moment(timestamp.toNumber() * 1000).fromNow();
  };

  const userLink = (publicKey: PublicKey): string => {
    return `${RoutePaths.USERS}/${publicKey.toBase58()}`;
  };

  const topicLink = (topic: string): string => {
    return `${RoutePaths.TOPICS}/${topic}`;
  };

  return (
    <div className="px-6 py-4">
      <div className="mb-2 flex justify-between">
        <NavLink
          className="text-gray-700 font-semibold hover:underline"
          to={userLink(tweet.author)}>
          {truncateStr(tweet.author.toBase58())}
        </NavLink>
        <span className="text-gray-400 text-sm">{formatDate(tweet.timestamp)}</span>
      </div>
      <p>{tweet.content}</p>
      {tweet.topic && (
        <NavLink
          className="text-blue-500 mt-1 hover:underline"
          to={topicLink(tweet.topic)}>
          #{tweet.topic}
        </NavLink>
      )}
    </div>
  );
};

export default TweetCard;
