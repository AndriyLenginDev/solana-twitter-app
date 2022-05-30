import React, { FC, useEffect } from 'react';
import UsersForm from '@/components/UsersForm/UsersForm';
import TweetList from '@/components/TweetList/TweetList';
import { tweetsActions } from '@/store/reducers/tweets';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectSortedTweets } from '@/store/reducers/tweets/selectors';
import { useParams } from 'react-router-dom';
import { authorFilter } from '@/web3/filters';

const Users: FC = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.tweets.loading);
  const tweets = useAppSelector(selectSortedTweets);
  const { publicKey } = useParams();

  useEffect(() => {
    if (publicKey) {
      dispatch(tweetsActions.getTweets([authorFilter(publicKey)]));
    }
    return () => {
      dispatch(tweetsActions.setTweets([]));
    };
  }, [dispatch, publicKey]);
  return (
    <>
      <UsersForm publicKeyParam={publicKey} />
      <TweetList
        tweets={tweets}
        loading={loading}
      />
    </>
  );
};

export default Users;
