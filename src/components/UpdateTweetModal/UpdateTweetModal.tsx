import React, { FC, useMemo, useState } from 'react';
import Modal, { ModalProps } from '@/components/general/Modal/Modal';
import TextArea from '@/components/general/TextArea/TextArea';
import IconInput from '@/components/IconInput/IconInput';
import HashIcon from '@/components/icons/HashIcon';
import CloseIcon from '@/components/icons/CloseIcon';
import Button from '@/components/general/Button/Button';
import DataItem from '@/components/general/DataItem/DataItem';
import classes from './UpdateTweetModal.module.scss';
import { useWallet } from '@solana/wallet-adapter-react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { tweetsActions } from '@/store/reducers/tweets';
import { CONTENT_MAX_CHARS, TOPIC_MAX_CHARS } from '@/web3/constants';
import { sendTweet } from '@/web3';
import { ITweet } from '@/models/tweet';

interface UpdateTweetModalProps extends ModalProps {
  tweet: ITweet;
}

const UpdateTweetModal: FC<UpdateTweetModalProps> = ({ isOpen, close, tweet }) => {
  const { connected } = useWallet();
  const dispatch = useAppDispatch();
  const [content, setContent] = useState<string>(tweet.content || '');
  const [topic, setTopic] = useState<string>(tweet.topic || '');
  const [loading, setLoading] = useState<boolean>(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTopic(e.target.value);
  };

  const charsLeft = useMemo<number>(() => {
    return CONTENT_MAX_CHARS - content.length;
  }, [content]);

  const charsLeftColor = useMemo<string>(() => {
    if (charsLeft < 0) return 'text-red-500';
    if (charsLeft <= 10) return 'text-yellow-500';
    return 'text-gray-400';
  }, [charsLeft]);

  const sendDisabled = useMemo<boolean>(() => {
    return !content.length || charsLeft < 0;
  }, [content, charsLeft]);

  const cancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    close();
  };

  const send = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (loading) return;

    try {
      setLoading(true);
      const tweet = await sendTweet(content, topic);
      dispatch(tweetsActions.addTweet(tweet));
    } catch (error) {
      // TODO: show error
    } finally {
      setLoading(false);
    }
  };

  if (!connected) {
    return <DataItem content={'Connect your wallet to start tweeting...'} />;
  }

  return (
    <Modal
      isOpen={isOpen}
      close={close}>
      <form className={classes.form__wrapper}>
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl text-blue-500">Update tweet</h1>
          <button
            className="flex text-xl p-2 rounded-full text-gray-400 hover:text-blue-500 hover:bg-gray-100"
            onClick={cancel}>
            <CloseIcon />
          </button>
        </div>
        <TextArea
          autoresize
          placeholder="What's happening?"
          value={content}
          onChange={handleTextChange}
        />
        <div className={classes.form__footer}>
          <IconInput
            className={classes.topic}
            Icon={HashIcon}
            maxLength={TOPIC_MAX_CHARS}
            value={topic}
            onChange={handleTopicChange}
          />
          <div className={classes.button}>
            <span className={[classes.counter, charsLeftColor].join(' ')}>{charsLeft} left</span>
            <Button
              disabled={sendDisabled}
              loading={loading}
              onClick={send}>
              Update
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default UpdateTweetModal;
