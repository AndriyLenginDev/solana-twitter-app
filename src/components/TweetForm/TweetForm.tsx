import React, { FC, useMemo, useState } from 'react';
import Button from '@/components/general/Button/Button';
import TextArea from '@/components/general/TextArea/TextArea';

const TweetForm: FC = () => {
  const MAX_CHARS = 280;

  const [loading, setLoading] = useState<boolean>(false);
  const [text, setText] = useState<string>('');

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const charsLeft = useMemo<number>(() => {
    return MAX_CHARS - text.length;
  }, [text]);

  const send = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <form className="py-4 px-6 border-b">
      <TextArea
        autoresize
        placeholder="Enter tweet"
        value={text}
        onChange={handleTextChange}
      />
      <div className="flex items-center justify-end mt-1">
        <span className="text-gray-400 text-l mr-6">{charsLeft} left</span>
        <Button
          loading={loading}
          onClick={send}>
          Send
        </Button>
      </div>
    </form>
  );
};

export default TweetForm;
