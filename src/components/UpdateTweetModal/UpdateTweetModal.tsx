import React, { FC } from 'react';
import Modal, { ModalProps } from '@/components/general/Modal/Modal';
import { ITweet } from '@/models/tweet';

interface UpdateTweetModalProps extends ModalProps {
  tweet: ITweet;
}

const UpdateTweetModal: FC<UpdateTweetModalProps> = ({ isOpen, close, tweet }) => {
  return (
    <Modal
      isOpen={isOpen}
      close={close}>
      {tweet.content}
    </Modal>
  );
};

export default UpdateTweetModal;
