import React, {FC, useCallback, useEffect} from 'react';
import TweetForm from '@/components/TweetForm/TweetForm';
import TweetList from '@/components/TweetList/TweetList';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { tweetsActions } from '@/store/reducers/tweets';
import { selectLoading, selectSortedTweets } from '@/store/reducers/tweets/selectors';

const Home: FC = () => {
  const loading = useAppSelector(selectLoading);
  const tweets = useAppSelector(selectSortedTweets);
  const dispatch = useAppDispatch();

  const onNewPage = useCallback(() => {
    dispatch(tweetsActions.getTweetsNextPage())
  }, [dispatch]);

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
        onNewPage={onNewPage}
      />
    </>
  );
};

export default Home;
