import React, { FC, useCallback, useEffect, useMemo } from 'react';
import UsersForm from '@/components/UsersForm/UsersForm';
import TweetList from '@/components/TweetList/TweetList';
import { tweetsActions } from '@/store/reducers/tweets';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectLoading, selectSortedTweets } from '@/store/reducers/tweets/selectors';
import { useParams } from 'react-router-dom';
import { authorFilter } from '@/web3/filters';
import { MemcmpFilter } from '@solana/web3.js';

const Users: FC = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoading);
  const tweets = useAppSelector(selectSortedTweets);
  const { publicKey } = useParams();

  const profileFilter = useMemo<MemcmpFilter[] | undefined>(() => {
    if (publicKey) {
      return [authorFilter(publicKey)];
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
      <UsersForm publicKeyParam={publicKey} />
      <TweetList
        tweets={tweets}
        loading={loading}
        onNewPage={onNewPage}
      />
    </>
  );
};

export default Users;
