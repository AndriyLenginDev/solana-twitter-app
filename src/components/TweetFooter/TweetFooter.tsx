import React, { FC, useMemo, useState } from 'react';
import classes from './TweetFooter.module.scss';
import { NavLink } from 'react-router-dom';
import HeartIcon from '@/components/icons/HeartIcon';
import HeartOutlineIcon from '@/components/icons/HeartOutlineIcon';
import { useWallet } from '@solana/wallet-adapter-react';
import { ITweet } from '@/models/tweet';
import { ILike, Like } from '@/models/like';
import { RoutePaths } from '@/router';

interface TweetFooterProps {
  tweet: ITweet;
}

const TweetFooter: FC<TweetFooterProps> = ({ tweet }) => {
  const { connected, publicKey } = useWallet();
  const [likes, setLikes] = useState<ILike[]>([]);

  const topicLink = (topic: string): string => {
    return `${RoutePaths.TOPICS}/${topic}`;
  };

  const hasLikes = useMemo<boolean>(() => {
    return !!likes.length;
  }, [likes]);

  const isLiked = useMemo<boolean>(() => {
    if (publicKey) {
      return !!likes.find((l) => l.author.toBase58() === publicKey.toBase58());
    }
    return false;
  }, [likes, publicKey]);

  const addLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (publicKey) {
      setLikes([...likes, new Like(publicKey)]);
    }
  };

  const removeLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (publicKey) {
      setLikes([...likes.filter((l) => l.author.toBase58() !== publicKey.toBase58())]);
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
        {hasLikes && <span>{likes.length}</span>}
        {isLiked ? (
          <button
            className={classes.active}
            onClick={removeLike}>
            <HeartIcon />
          </button>
        ) : (
          <button
            disabled={!connected}
            onClick={addLike}>
            <HeartOutlineIcon />
          </button>
        )}
      </div>
    </div>
  );
};

export default TweetFooter;
