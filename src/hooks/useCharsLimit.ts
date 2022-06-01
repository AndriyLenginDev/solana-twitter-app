import { useMemo } from 'react';

interface CharsLimit {
  charsLeft: number;
  charsLeftClass: string;
}

export const useCharsLimit = (content: string, limit: number): CharsLimit => {
  const charsLeft = useMemo<number>(() => {
    return limit - content.length;
  }, [content.length, limit]);

  const charsLeftClass = useMemo<string>(() => {
    if (charsLeft < 0) return 'text-red-500';
    if (charsLeft <= 10) return 'text-yellow-500';
    return 'text-gray-400';
  }, [charsLeft]);

  return {
    charsLeft,
    charsLeftClass
  };
};
