import React, { FC, useMemo, useState } from 'react';
import TextArea from '@/components/general/TextArea/TextArea';
import Button from '@/components/general/Button/Button';
import classes from './TweetForm.module.scss';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { tweetsActions } from '@/store/reducers/tweets';

export interface TweetFormProps {
  className?: string;
}

const TweetForm: FC<TweetFormProps> = ({ className }) => {
  const MAX_CHARS = 280;
  const { sendLoading } = useAppSelector((state) => state.tweets);
  const dispatch = useAppDispatch();
  const [content, setContent] = useState<string>('');

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const charsLeft = useMemo<number>(() => {
    return MAX_CHARS - content.length;
  }, [content]);

  const charsLeftColor = useMemo<string>(() => {
    if (charsLeft < 0) return 'text-red-500';
    if (charsLeft <= 10) return 'text-yellow-500';
    return 'text-gray-400';
  }, [charsLeft]);

  const sendDisabled = useMemo<boolean>(() => {
    return !content.length || charsLeft < 0;
  }, [content, charsLeft]);

  const send = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    dispatch(tweetsActions.sendTweet({ content }));
    setContent('');
  };

  return (
    <form className={[classes.form__wrapper, className].join(' ')}>
      <TextArea
        autoresize
        placeholder="Enter tweet"
        value={content}
        onChange={handleTextChange}
      />
      <div className={classes.form__footer}>
        <span className={[classes.form__counter, charsLeftColor].join(' ')}>{charsLeft} left</span>
        <Button
          disabled={sendDisabled}
          loading={sendLoading}
          onClick={send}>
          Send
        </Button>
      </div>
    </form>
  );
};

export default TweetForm;
