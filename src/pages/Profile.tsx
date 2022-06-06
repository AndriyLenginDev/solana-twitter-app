import React, { FC, useCallback, useEffect, useMemo } from 'react';
import DataItem from '@/components/general/DataItem/DataItem';
import KeyIcon from '@/components/icons/KeyIcon';
import TweetForm from '@/components/TweetForm/TweetForm';
import TweetList from '@/components/TweetList/TweetList';
import { tweetsActions } from '@/store/reducers/tweets';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectLoading, selectSortedTweets } from '@/store/reducers/tweets/selectors';
import { useWallet } from '@solana/wallet-adapter-react';
import { authorFilter } from '@/web3/filters';
import { MemcmpFilter } from '@solana/web3.js';

const Profile: FC = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoading);
  const tweets = useAppSelector(selectSortedTweets);
  const { publicKey } = useWallet();

  const accountAddress = useMemo<string>(() => {
    return publicKey ? publicKey.toBase58() : '';
  }, [publicKey]);

  const profileFilter = useMemo<MemcmpFilter[] | undefined>(() => {
    if (publicKey) {
      return [authorFilter(publicKey.toBase58())];
    }
  }, [publicKey]);

  const onNewPage = useCallback(() => {
    if (publicKey) {
      dispatch(tweetsActions.getTweetsNextPage(profileFilter));
    }
  }, [dispatch, profileFilter, publicKey]);

  useEffect(() => {
    if (publicKey) {
      dispatch(tweetsActions.getTweets(profileFilter));
    }
    return () => {
      dispatch(tweetsActions.setTweets([]));
    };
  }, [dispatch, profileFilter, publicKey]);
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
