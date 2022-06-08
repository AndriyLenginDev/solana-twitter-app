import React, { FC } from 'react';
import TweetForm from '@/components/TweetForm/TweetForm';
import TweetList from '@/components/TweetList/TweetList';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectLoading, selectSortedTweets } from '@/store/reducers/tweets/selectors';
import { usePaginatedTweets } from '@/hooks/usePaginatedTweets';

const Home: FC = () => {
  const loading = useAppSelector(selectLoading);
  const tweets = useAppSelector(selectSortedTweets);
  const { onNewPage } = usePaginatedTweets();

  return (
    <>
      <TweetForm />
      <TweetList
        tweets={tweets}
        loading={loading}
        onNewPage={onNewPage}
      />
    </>
  );
};

export default Home;
