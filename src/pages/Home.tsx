import React, { FC } from 'react';
import TweetForm from '@/components/TweetForm/TweetForm';
import DataItem from '@/components/general/DataItem/DataItem';
import { useWallet } from '@solana/wallet-adapter-react';

const Home: FC = () => {
  const { connected } = useWallet();

  return <>{connected ? <TweetForm /> : <DataItem content={'Connect your wallet to start tweeting...'} />}</>;
};

export default Home;
