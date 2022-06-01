import React, { FC, useCallback, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import EditIcon from '@/components/icons/EditIcon';
import DeleteIcon from '@/components/icons/DeleteIcon';
import classes from './TweetCard.module.scss';
import { ITweet } from '@/models/tweet';
import { PublicKey } from '@solana/web3.js';
import { RoutePaths } from '@/router';
import { useWallet } from '@solana/wallet-adapter-react';
import { useModal } from '@/hooks/useModal';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { tweetsActions } from '@/store/reducers/tweets';
import Modal from '@/components/general/Modal/Modal';

export interface TweetCardProps {
  tweet: ITweet;
}

const TweetCard: FC<TweetCardProps> = ({ tweet }) => {
  const { publicKey } = useWallet();
  const { isOpen, toggle } = useModal();
  const dispatch = useAppDispatch();

  const authorLink = useCallback(
    (author: PublicKey): string => {
      if (publicKey?.toBase58() === author.toBase58()) {
        return RoutePaths.PROFILE;
      }
      return `${RoutePaths.USERS}/${author.toBase58()}`;
    },
    [publicKey]
  );

  const topicLink = (topic: string): string => {
    return `${RoutePaths.TOPICS}/${topic}`;
  };

  const isSelfTweet = useMemo<boolean>(() => {
    return publicKey?.toBase58() === tweet.author.toBase58();
  }, [publicKey, tweet.author]);

  const editTweet = (e: React.MouseEvent<HTMLButtonElement>) => {
    toggle();
  };

  const deleteTweet = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(tweetsActions.deleteTweet(tweet));
  };

  return (
    <>
      <div className={classes.tweet__wrapper}>
        <div className={classes.tweet__header}>
          <NavLink
            className={classes.author}
            to={authorLink(tweet.author)}>
            {tweet.authorKey}
          </NavLink>
          <span className={classes.date}>{tweet.createdAt}</span>
          {isSelfTweet && (
            <div className={classes.controls}>
              <button onClick={editTweet}>
                <EditIcon />
              </button>
              <button onClick={deleteTweet}>
                <DeleteIcon />
              </button>
            </div>
          )}
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
      <Modal
        isOpen={isOpen}
        close={toggle}>
        Tweet form modal
      </Modal>
    </>
  );
};

export default TweetCard;
