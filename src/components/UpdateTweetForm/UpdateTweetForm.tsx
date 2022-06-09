import React, { FC, useMemo, useState } from 'react';
import TextArea from '@/components/general/TextArea/TextArea';
import IconInput from '@/components/IconInput/IconInput';
import HashIcon from '@/components/icons/HashIcon';
import Button from '@/components/general/Button/Button';
import DataItem from '@/components/general/DataItem/DataItem';
import classes from './UpdateTweetForm.module.scss';
import { useWallet } from '@solana/wallet-adapter-react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useCharsLimit } from '@/hooks/useCharsLimit';
import { tweetsActions } from '@/store/reducers/tweets';
import { CONTENT_MAX_CHARS, TOPIC_MAX_CHARS } from '@/web3/constants';
import { updateTweet } from '@/web3/tweets';
import { ITweet } from '@/models/tweet';

interface UpdateTweetModalProps  {
  tweet: ITweet;
  onFinish: () => any;
}

const UpdateTweetForm: FC<UpdateTweetModalProps> = ({ tweet, onFinish }) => {
  const { connected } = useWallet();
  const dispatch = useAppDispatch();
  const [tweetData, setTweetData] = useState<ITweet>(tweet || {});
  const [loading, setLoading] = useState<boolean>(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweetData({ ...tweetData, content: e.target.value });
  };

  const handleTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTweetData({ ...tweetData, topic: e.target.value });
  };

  const { charsLeft, charsLeftClass } = useCharsLimit(tweetData.content, CONTENT_MAX_CHARS);

  const sendDisabled = useMemo<boolean>(() => {
    return !tweetData.content.length || charsLeft < 0;
  }, [tweetData.content, charsLeft]);

  const send = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (loading) return;

    try {
      setLoading(true);
      const updatedTweet = await updateTweet(tweet, tweetData.topic, tweetData.content);
      dispatch(tweetsActions.updateTweet(updatedTweet));
      onFinish();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!connected) {
    return <DataItem content={'Connect your wallet to start tweeting...'} />;
  }

  return (
    <form className={classes.form__wrapper}>
      <TextArea
        autoresize
        placeholder="What's happening?"
        value={tweetData.content}
        onChange={handleTextChange}
      />
      <div className={classes.form__footer}>
        <IconInput
          className={classes.topic}
          Icon={HashIcon}
          maxLength={TOPIC_MAX_CHARS}
          value={tweetData.topic}
          onChange={handleTopicChange}
        />
        <div className={classes.button}>
          <span className={[classes.counter, charsLeftClass].join(' ')}>{charsLeft} left</span>
          <Button
            disabled={sendDisabled}
            loading={loading}
            onClick={send}>
            Update
          </Button>
        </div>
      </div>
    </form>
  );
};

export default UpdateTweetForm;
