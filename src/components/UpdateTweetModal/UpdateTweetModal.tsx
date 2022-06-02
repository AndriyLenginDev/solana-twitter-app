import React, { FC } from 'react';
import classes from './UpdateTweetModal.module.scss';
import Modal, { ModalProps } from '@/components/general/Modal/Modal';
import CloseIcon from '@/components/icons/CloseIcon';
import UpdateTweetForm from '@/components/UpdateTweetForm/UpdateTweetForm';
import { ITweet } from '@/models/tweet';

interface UpdateTweetModalProps extends ModalProps {
  tweet: ITweet;
}

const UpdateTweetModal: FC<UpdateTweetModalProps> = ({ isOpen, close, tweet }) => {
  return (
    <Modal
      isOpen={isOpen}
      close={close}>
      <div className={classes.modal__wrapper}>
        <div className={classes.modal__header}>
          <h1>Update tweet</h1>
          <button
            className={classes.cancel}
            onClick={() => close()}>
            <CloseIcon />
          </button>
        </div>
        <UpdateTweetForm tweet={tweet} onFinish={close} />
      </div>
    </Modal>
  );
};

export default UpdateTweetModal;
