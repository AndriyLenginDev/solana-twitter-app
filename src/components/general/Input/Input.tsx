import React, { ComponentPropsWithoutRef, FC } from 'react';
import classes from './Input.module.scss';

export interface InputProps extends ComponentPropsWithoutRef<'input'> {
  className?: string;
}

const Input: FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      {...props}
      className={[classes.input, className].join(' ')}
    />
  );
};

export default Input;
