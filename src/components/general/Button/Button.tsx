import React, { FC, ComponentPropsWithoutRef, useMemo, useRef, useEffect } from 'react';
import classes from './Button.module.scss';
import LoaderIcon from '@/components/icons/LoaderIcon';
import { SwitchTransition, CSSTransition } from 'react-transition-group';

export enum ButtonVariants {
  PRIMARY = 'primary',
  SECONDARY = 'secondary'
}

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  children?: React.ReactNode;
  className?: string;
  loading?: boolean;
  variant?: ButtonVariants;
}

const Button: FC<ButtonProps> = ({
  children,
  className,
  loading,
  variant = ButtonVariants.PRIMARY,
  ...props
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);

  const variantClassName = useMemo<string>(() => {
    return classes[`btn--${variant}`];
  }, [variant]);

  useEffect(() => {
    if (btnRef.current) {
      const btnWidth = btnRef.current.offsetWidth;
      btnRef.current.style.width = `${btnWidth}px`;
    }
  }, []);

  return (
    <button
      ref={btnRef}
      {...props}
      className={[classes.btn, variantClassName, className].join(' ')}>
      <SwitchTransition mode="out-in">
        <CSSTransition
          addEndListener={(node: HTMLElement, done: () => void) => {
            node.addEventListener('transitionend', done, false);
          }}
          key={loading ? 'loader' : 'btn'}
          classNames="fade"
          unmountOnExit>
          {loading ? (
            <div className={classes.btn__loader}>
              <LoaderIcon className={classes.loader_color} />
            </div>
          ) : (
            <div className={classes.btn__txt}>{children}</div>
          )}
        </CSSTransition>
      </SwitchTransition>
    </button>
  );
};

export default Button;
