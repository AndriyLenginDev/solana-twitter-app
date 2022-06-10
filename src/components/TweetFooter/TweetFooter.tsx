import React, { FC, useMemo } from 'react';
import classes from './TweetFooter.module.scss';
import { NavLink } from 'react-router-dom';
import HeartIcon from '@/components/icons/HeartIcon';
import HeartOutlineIcon from '@/components/icons/HeartOutlineIcon';
import { useWallet } from '@solana/wallet-adapter-react';
import { ITweet } from '@/models/tweet';
import { ILike } from '@/models/like';
import { RoutePaths } from '@/router';
import { addLike, deleteLike } from '@/web3/likes';

interface TweetFooterProps {
  tweet: ITweet;
}

const TweetFooter: FC<TweetFooterProps> = ({ tweet }) => {
  const { connected, publicKey } = useWallet();

  const topicLink = (topic: string): string => {
    return `${RoutePaths.TOPICS}/${topic}`;
  };

  const hasLikes = useMemo<boolean>(() => {
    return !!tweet.likes;
  }, [tweet.likes]);

  const handleAddLike = async () => {
    if (publicKey) {
      try {
        // const like = await addLike(tweet.publicKey);
        // tweet.incrementLikes();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleRemoveLike = async () => {
    if (publicKey && tweet.isLiked) {
      try {
        // await deleteLike(like);
        // tweet.decrementLikes();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className={classes.footer}>
      {tweet.topic && (
        <NavLink
          className={classes.footer__topic}
          to={topicLink(tweet.topic)}>
          #{tweet.topic}
        </NavLink>
      )}
      <div className={classes.footer__likes}>
        {hasLikes && <span>{tweet.likes}</span>}
        {tweet.isLiked ? (
          <button
            className={classes.active}
            onClick={handleRemoveLike}>
            <HeartIcon />
          </button>
        ) : (
          <button
            disabled={!connected}
            onClick={handleAddLike}>
            <HeartOutlineIcon />
          </button>
        )}
      </div>
    </div>
  );
};

export default TweetFooter;
