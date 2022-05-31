import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './TweetCard.module.scss';
import { ITweet } from '@/models/tweet';
import { PublicKey } from '@solana/web3.js';
import { RoutePaths } from '@/router';
import { useWallet } from '@solana/wallet-adapter-react';

export interface TweetCardProps {
  tweet: ITweet;
}

const TweetCard: FC<TweetCardProps> = ({ tweet }) => {
  const { publicKey } = useWallet();

  const authorLink = (author: PublicKey): string => {
    if (publicKey?.toBase58() === author.toBase58()) {
      return RoutePaths.PROFILE;
    }
    return `${RoutePaths.USERS}/${author.toBase58()}`;
  };

  const topicLink = (topic: string): string => {
    return `${RoutePaths.TOPICS}/${topic}`;
  };

  return (
    <div className={classes.tweet__wrapper}>
      <div className={classes.tweet__header}>
        <NavLink
          className={classes.author}
          to={authorLink(tweet.author)}>
          {tweet.authorKey}
        </NavLink>
        <span className={classes.date}>{tweet.createdAgo}</span>
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
