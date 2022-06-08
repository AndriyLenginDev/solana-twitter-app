import React, { FC, useMemo } from 'react';
import DataItem from '@/components/general/DataItem/DataItem';
import KeyIcon from '@/components/icons/KeyIcon';
import TweetForm from '@/components/TweetForm/TweetForm';
import TweetList from '@/components/TweetList/TweetList';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectLoading, selectSortedTweets } from '@/store/reducers/tweets/selectors';
import { useWallet } from '@solana/wallet-adapter-react';
import { authorFilter } from '@/web3/filters';
import { usePaginatedTweets } from '@/hooks/usePaginatedTweets';

const Profile: FC = () => {
  const loading = useAppSelector(selectLoading);
  const tweets = useAppSelector(selectSortedTweets);
  const { publicKey } = useWallet();

  const accountAddress = useMemo<string>(() => {
    return publicKey ? publicKey.toBase58() : '';
  }, [publicKey]);

  const { onNewPage } = usePaginatedTweets(authorFilter, accountAddress, true);

  return (
    <>
      <DataItem
        Icon={KeyIcon}
        content={accountAddress}
      />
      <TweetForm />
      <TweetList
        tweets={tweets}
        loading={loading}
        onNewPage={onNewPage}
      />
    </>
  );
};

export default Profile;
