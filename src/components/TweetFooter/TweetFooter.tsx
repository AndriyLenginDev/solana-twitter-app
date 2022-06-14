import React, { FC, useMemo } from 'react';
import classes from './TweetFooter.module.scss';
import { NavLink } from 'react-router-dom';
import HeartIcon from '@/components/icons/HeartIcon';
import HeartOutlineIcon from '@/components/icons/HeartOutlineIcon';
import { useWallet } from '@solana/wallet-adapter-react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { tweetsActions } from '@/store/reducers/tweets';
import { ITweet } from '@/models/tweet';
import { RoutePaths } from '@/router';

interface TweetFooterProps {
  tweet: ITweet;
}

const TweetFooter: FC<TweetFooterProps> = ({ tweet }) => {
  const { connected, publicKey } = useWallet();
  const dispatch = useAppDispatch();

  const topicLink = (topic: string): string => {
    return `${RoutePaths.TOPICS}/${topic}`;
  };

  const hasLikes = useMemo<boolean>(() => {
    return !!tweet.likes;
  }, [tweet.likes]);

  const isLiked = useMemo<boolean>(() => {
    return !!tweet.personalLike;
  }, [tweet.personalLike]);

  const handleAddLike = async () => {
    if (publicKey) {
      dispatch(tweetsActions.addLike(tweet));
    }
  };

  const handleRemoveLike = async () => {
    if (publicKey) {
      dispatch(tweetsActions.removeLike(tweet));
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
