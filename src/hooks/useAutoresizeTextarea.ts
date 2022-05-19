import { RefObject, useCallback, useEffect } from 'react';

export const useAutoresizeTextarea = (textAreaRef: RefObject<HTMLTextAreaElement>): void => {
  const resizeTextarea = useCallback(() => {
    const element = textAreaRef.current;
    if (!element) return;
    element.style.height = 'auto';
    element.style.height = element.scrollHeight + 'px';
  }, [textAreaRef]);

  useEffect(() => {
    const element = textAreaRef.current;
    if (!element) return;

    resizeTextarea();
    element.addEventListener('input', resizeTextarea);
    return () => {
      element?.removeEventListener('input', resizeTextarea);
    };
  }, [resizeTextarea, textAreaRef]);
};
