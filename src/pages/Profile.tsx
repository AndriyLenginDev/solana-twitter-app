import React, { FC, useMemo } from 'react';
import DataItem from '@/components/general/DataItem/DataItem';
import KeyIcon from '@/components/icons/KeyIcon';
import TweetForm from '@/components/TweetForm/TweetForm';
import { useWallet } from '@solana/wallet-adapter-react';

const Profile: FC = () => {
  const { publicKey } = useWallet();

  const accountAddress = useMemo<string>(() => {
    return publicKey ? publicKey.toBase58() : '';
  }, [publicKey]);

  return (
    <>
      <DataItem
        Icon={KeyIcon}
        content={accountAddress}
      />
      <TweetForm />
    </>
  );
};

export default Profile;
