import React, { FC, useEffect, useMemo } from 'react';
import DataItem from '@/components/general/DataItem/DataItem';
import KeyIcon from '@/components/icons/KeyIcon';
import TweetForm from '@/components/TweetForm/TweetForm';
import TweetList from '@/components/TweetList/TweetList';
import { tweetsActions } from '@/store/reducers/tweets';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectSortedTweets } from '@/store/reducers/tweets/selectors';
import { useWallet } from '@solana/wallet-adapter-react';
import { authorFilter } from '@/web3/filters';

const Profile: FC = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.tweets.loading);
  const tweets = useAppSelector(selectSortedTweets);
  const { publicKey } = useWallet();

  const accountAddress = useMemo<string>(() => {
    return publicKey ? publicKey.toBase58() : '';
  }, [publicKey]);

  useEffect(() => {
    if (publicKey) {
      dispatch(tweetsActions.getTweets([authorFilter(publicKey.toBase58())]));
    }
    return () => {
      dispatch(tweetsActions.setTweets([]));
    };
  }, [dispatch, publicKey]);
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
      />
    </>
  );
};

export default Profile;
