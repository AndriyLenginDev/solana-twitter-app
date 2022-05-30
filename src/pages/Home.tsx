import React, { FC, useEffect } from 'react';
import TweetForm from '@/components/TweetForm/TweetForm';
import TweetList from '@/components/TweetList/TweetList';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { tweetsActions } from '@/store/reducers/tweets';
import { selectSortedTweets } from '@/store/reducers/tweets/selectors';

const Home: FC = () => {
  const loading = useAppSelector((state) => state.tweets.loading);
  const tweets = useAppSelector(selectSortedTweets);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(tweetsActions.getTweets());
    return () => {
      dispatch(tweetsActions.setTweets([]));
    };
  }, [dispatch]);
  return (
    <>
      <TweetForm />
      <TweetList
        tweets={tweets}
        loading={loading}
      />
    </>
  );
};

export default Home;
