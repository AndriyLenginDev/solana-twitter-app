import React, { ComponentPropsWithoutRef, FC, useRef } from 'react';
import classes from './TextArea.module.scss';
import { useAutoresizeTextarea } from '@/hooks/useAutoresizeTextarea';

export interface TextAreaProps extends ComponentPropsWithoutRef<'textarea'> {
  className?: string;
  autoresize?: boolean;
}

const TextArea: FC<TextAreaProps> = ({ className, autoresize, ...props }) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutoresizeTextarea(autoresize ? textAreaRef : undefined);

  return (
    <textarea
      ref={textAreaRef}
      {...props}
      className={[classes.textarea, className].join(' ')}
    />
  );
};

export default TextArea;
