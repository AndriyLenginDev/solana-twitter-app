import { RefObject, useEffect } from 'react';

export const useObserver = (
  ref: RefObject<HTMLElement>,
  callback: () => unknown,
  frozen: boolean = false
): void => {
  useEffect(() => {
    const node = ref?.current;
    const hasIOSupport = !!window.IntersectionObserver;

    if (!node || !hasIOSupport) return;

    const observer = new IntersectionObserver(([entry]: IntersectionObserverEntry[]) => {
      if (entry?.isIntersecting && !frozen) {
        callback();
      }
    });
    observer.observe(node);

    return () => observer.disconnect();
  }, [ref, frozen, callback]);
};
