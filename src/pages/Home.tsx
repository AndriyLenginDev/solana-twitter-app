import React, { FC, useEffect } from 'react';
import TweetForm from '@/components/TweetForm/TweetForm';
import DataItem from '@/components/general/DataItem/DataItem';
import TweetList from '@/components/TweetList/TweetList';
import { useWallet } from '@solana/wallet-adapter-react';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { tweetsActions } from '@/store/reducers/tweets';
import { selectSortedTweets } from '@/store/reducers/tweets/selectors';

const Home: FC = () => {
  const { connected } = useWallet();
  const tweetsLoading = useAppSelector((state) => state.tweets.tweetsLoading);
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
      {connected ? (
        <TweetForm />
      ) : (
        <DataItem content={'Connect your wallet to start tweeting...'} />
      )}
      <TweetList
        tweets={tweets}
        loading={tweetsLoading}
      />
    </>
  );
};

export default Home;
