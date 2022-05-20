import React, { FC, useMemo, useState } from 'react';
import TextArea from '@/components/general/TextArea/TextArea';
import Button from '@/components/general/Button/Button';
import classes from './TweetForm.module.scss';

export interface TweetFormProps {
  className?: string;
}

const TweetForm: FC<TweetFormProps> = ({ className }) => {
  const MAX_CHARS = 280;

  const [loading, setLoading] = useState<boolean>(false);
  const [text, setText] = useState<string>('');

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const charsLeft = useMemo<number>(() => {
    return MAX_CHARS - text.length;
  }, [text]);

  const sendDisabled = useMemo<boolean>(() => {
    return !text.length;
  }, [text]);

  const send = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    console.log('send', text);
    setLoading(true);
    setTimeout(() => {
      setText('');
      setLoading(false);
    }, 1000);
  };

  return (
    <form className={[classes.form__wrapper, className].join(' ')}>
      <TextArea
        autoresize
        placeholder="Enter tweet"
        value={text}
        onChange={handleTextChange}
      />
      <div className={classes.form__footer}>
        <span className={classes.form__counter}>{charsLeft} left</span>
        <Button
          disabled={sendDisabled}
          loading={loading}
          onClick={send}>
          Send
        </Button>
      </div>
    </form>
  );
};

export default TweetForm;
