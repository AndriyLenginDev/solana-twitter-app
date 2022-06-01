import React from 'react';

export const truncateStr = (str: string, length = 20, separator = '...'): string => {
  if (str.length <= length) {
    return str;
  }

  const sepLength = separator.length;
  const charsToShow = length - sepLength;
  const frontChars = Math.ceil(charsToShow / 2);
  const backChars = Math.floor(charsToShow / 2);

  return `${str.substr(0, frontChars)}${separator}${str.substr(str.length - backChars)}`;
};

export const stopPropagation = (e: React.MouseEvent): void => {
  e.stopPropagation();
};

export const shallowClone = <T>(obj: T, props: Partial<T> = {}): T => {
  const copy = Object.create(
    Object.getPrototypeOf(obj),
    Object.getOwnPropertyDescriptors(obj)
  );

  return Object.assign(copy, props);
};
