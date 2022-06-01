import React, { FC } from 'react';
import { createPortal } from 'react-dom';
import classes from './Modal.module.scss';
import { stopPropagation } from '@/utils/helpers';

export interface ModalProps {
  isOpen: boolean;
  close: () => void;
  children?: React.ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, close, children }) =>
  isOpen
    ? createPortal(
        <div
          className={classes.modal__backdrop}
          onClick={() => close()}>
          <div
            className={classes.modal__content}
            onClick={stopPropagation}>
            {children}
          </div>
        </div>,
        document.body
      )
    : null;

export default Modal;
