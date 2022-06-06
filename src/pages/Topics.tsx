import React, { FC, useEffect } from 'react';
import TopicsForm from '@/components/TopicsForm/TopicsForm';
import TweetForm from '@/components/TweetForm/TweetForm';
import TweetList from '@/components/TweetList/TweetList';
import { tweetsActions } from '@/store/reducers/tweets';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectLoading, selectSortedTweets } from '@/store/reducers/tweets/selectors';
import { useParams } from 'react-router-dom';
import { topicFilter } from '@/web3/filters';

const Topics: FC = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoading);
  const tweets = useAppSelector(selectSortedTweets);
  const { topic } = useParams();

  // TODO: add onNewPage handler

  useEffect(() => {
    if (topic) {
      dispatch(tweetsActions.getTweets([topicFilter(topic)]));
    }
    return () => {
      dispatch(tweetsActions.setTweets([]));
    };
  }, [dispatch, topic]);
  return (
    <>
      <TopicsForm topicParam={topic} />
      {topic && <TweetForm forcedTopic={topic} />}
      <TweetList
        tweets={tweets}
        loading={loading}
      />
    </>
  );
};

export default Topics;
