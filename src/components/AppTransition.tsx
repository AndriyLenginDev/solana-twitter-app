import React, { FC } from 'react';
import { CSSTransition } from 'react-transition-group';

export interface AppTransitionProps {
  inProp?: boolean;
  children?: React.ReactNode;
  classNames?: string;
}

const AppTransition: FC<AppTransitionProps> = ({ inProp, children, classNames }) => {
  return (
    <CSSTransition<undefined>
      addEndListener={(node: HTMLElement, done: () => void) => {
        node.addEventListener('transitionend', done, false);
      }}
      in={inProp}
      classNames={classNames}
      unmountOnExit>
      {children}
    </CSSTransition>
  );
};

export default AppTransition;
