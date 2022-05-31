import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './TweetCard.module.scss';
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
    <div className={classes.tweet__wrapper}>
      <div className={classes.tweet__header}>
        <NavLink
          className={classes.author}
          to={userLink(tweet.author)}>
          {truncateStr(tweet.author.toBase58())}
        </NavLink>
        <span className={classes.date}>{formatDate(tweet.timestamp)}</span>
      </div>
      <div className={classes.tweet__body}>
        <p className={classes.content}>{tweet.content}</p>
        {tweet.topic && (
          <NavLink
            className={classes.topic}
            to={topicLink(tweet.topic)}>
            #{tweet.topic}
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default TweetCard;
