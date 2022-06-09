import React, { FC, useEffect, useMemo, useState } from 'react';
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
  const [like, setLike] = useState<ILike | null>(null);

  const topicLink = (topic: string): string => {
    return `${RoutePaths.TOPICS}/${topic}`;
  };

  const hasLikes = useMemo<boolean>(() => {
    return !!tweet.likes;
  }, [tweet.likes]);

  const isLiked = false;

  // const isLiked = useMemo<boolean>(() => {
  //   if (publicKey) {
  //     return !!likes.find((l) => l.author.toBase58() === publicKey.toBase58());
  //   }
  //   return false;
  // }, [likes, publicKey]);

  const handleAddLike = async () => {
    if (publicKey) {
      try {
        // const like = await addLike(tweet.publicKey);
        // setLike(like);
        tweet.incrementLikes();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleRemoveLike = async () => {
    if (publicKey && like) {
      try {
        await deleteLike(like);
        setLike(null);
        tweet.decrementLikes();
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    // TODO: get likes counter and personal like
    // tweet.prefetchLikes().catch(console.error);
  }, [tweet]);

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
        {isLiked ? (
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
