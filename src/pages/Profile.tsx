import React, { FC } from 'react';
import Header from '@/components/Header';
import DataItem from '@/components/general/DataItem/DataItem';
import KeyIcon from '@/components/icons/KeyIcon';
import TweetForm from '@/components/TweetForm/TweetForm';
import { PublicKey } from '@solana/web3.js';

const Profile: FC = () => {
  const publicKey = new PublicKey('8zAvCGuctj7KdPhPCcr9UhpfsWBfC92Q9GaU6ZhL1TD6');

  return (
    <>
      <Header>Profile</Header>
      <DataItem
        Icon={KeyIcon}
        content={publicKey.toBase58()}
      />
      <TweetForm />
    </>
  );
};

export default Profile;
