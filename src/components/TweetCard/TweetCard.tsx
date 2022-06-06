import React, { FC, memo, useCallback, useMemo } from 'react';
import classes from './TweetCard.module.scss';
import { NavLink } from 'react-router-dom';
import TweetControls from '@/components/TweetControls/TweetControls';
import TweetFooter from '@/components/TweetFooter/TweetFooter';
import { useWallet } from '@solana/wallet-adapter-react';
import { ITweet } from '@/models/tweet';
import { PublicKey } from '@solana/web3.js';
import { RoutePaths } from '@/router';

export interface TweetCardProps {
  tweet: ITweet;
}

const TweetCard: FC<TweetCardProps> = ({ tweet }) => {
  const { publicKey } = useWallet();

  const authorLink = useCallback(
    (author: PublicKey): string => {
      if (publicKey?.toBase58() === author.toBase58()) {
        return RoutePaths.PROFILE;
      }
      return `${RoutePaths.USERS}/${author.toBase58()}`;
    },
    [publicKey]
  );

  const isSelfTweet = useMemo<boolean>(() => {
    return publicKey?.toBase58() === tweet.author.toBase58();
  }, [publicKey, tweet.author]);

  return (
    <div className={classes.tweet__wrapper}>
      <div className={classes.tweet__header}>
        <NavLink
          className={classes.author}
          to={authorLink(tweet.author)}>
          {tweet.authorKey}
        </NavLink>
        <span className={classes.date}>{tweet.createdAt}</span>
        {isSelfTweet && <TweetControls tweet={tweet} />}
      </div>
      <div className={classes.tweet__body}>
        <p className={classes.content}>{tweet.content}</p>
      </div>
      <TweetFooter tweet={tweet} />
    </div>
  );
};

export default memo(TweetCard);
