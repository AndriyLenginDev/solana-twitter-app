import React, { FC } from 'react';
import classes from './TweetControls.module.scss';
import EditIcon from '@/components/icons/EditIcon';
import DeleteIcon from '@/components/icons/DeleteIcon';
import UpdateTweetModal from '@/components/UpdateTweetModal/UpdateTweetModal';
import { useModal } from '@/hooks/useModal';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { tweetsActions } from '@/store/reducers/tweets';
import { ITweet } from '@/models/tweet';

interface TweetControlsProps {
  tweet: ITweet;
}

const TweetControls: FC<TweetControlsProps> = ({ tweet }) => {
  const { isOpen, toggle } = useModal();
  const dispatch = useAppDispatch();

  const editTweet = (e: React.MouseEvent<HTMLButtonElement>) => {
    toggle();
  };

  const deleteTweet = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(tweetsActions.deleteTweet(tweet));
  };

  return (
    <>
      <div className={classes.controls__wrapper}>
        <button onClick={editTweet}>
          <EditIcon />
        </button>
        <button onClick={deleteTweet}>
          <DeleteIcon />
        </button>
      </div>
      <UpdateTweetModal
        isOpen={isOpen}
        close={toggle}
        tweet={tweet}
      />
    </>
  );
};

export default TweetControls;
