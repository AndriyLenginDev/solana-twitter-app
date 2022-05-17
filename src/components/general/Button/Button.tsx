import React, { FC, ComponentPropsWithoutRef, useRef, useEffect } from 'react';
import classes from './Button.module.scss';
import LoaderIcon from '@/components/icons/LoaderIcon';
import AppTransition from '@/components/AppTransition';

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  children?: React.ReactNode;
  className?: string;
  loading?: boolean;
}

const Button: FC<ButtonProps> = ({ children, className, loading, ...props }) => {
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (btnRef.current) {
      const btnWidth = btnRef.current.clientWidth + 24; // loader width + margin-right
      btnRef.current.style.width = `${btnWidth}px`;
    }
  }, []);

  return (
    <button
      {...props}
      ref={btnRef}
      className={[classes.btn, className].join(' ')}>
      <AppTransition
        inProp={loading}
        classNames="loader-animation">
        <div className={`${classes['btn__loader']} ${loading ? 'mr-2' : ''}`}>
          <LoaderIcon fill="#3b82f6" />
        </div>
      </AppTransition>
      <div className={classes['btn__txt']}>{children}</div>
    </button>
  );
};

export default Button;
