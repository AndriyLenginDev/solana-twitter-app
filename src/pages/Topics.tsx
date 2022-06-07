import React, { FC, useCallback, useEffect, useMemo } from 'react';
import TopicsForm from '@/components/TopicsForm/TopicsForm';
import TweetForm from '@/components/TweetForm/TweetForm';
import TweetList from '@/components/TweetList/TweetList';
import { tweetsActions } from '@/store/reducers/tweets';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectLoading, selectSortedTweets } from '@/store/reducers/tweets/selectors';
import { useParams } from 'react-router-dom';
import { topicFilter } from '@/web3/filters';
import { MemcmpFilter } from '@solana/web3.js';

const Topics: FC = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoading);
  const tweets = useAppSelector(selectSortedTweets);
  const { topic } = useParams();

  const topicsFilter = useMemo<MemcmpFilter[] | undefined>(() => {
    if (topic) {
      return [topicFilter(topic)];
    }
  }, [topic]);

  const onNewPage = useCallback(() => {
    if (topic) {
      dispatch(tweetsActions.getTweetsNextPage(topicsFilter));
    }
  }, [dispatch, topicsFilter, topic]);

  useEffect(() => {
    if (topic) {
      dispatch(tweetsActions.getTweets(topicsFilter));
    }
    return () => {
      dispatch(tweetsActions.setTweets([]));
    };
  }, [dispatch, topicsFilter, topic]);
  return (
    <>
      <TopicsForm topicParam={topic} />
      {topic && <TweetForm forcedTopic={topic} />}
      <TweetList
        tweets={tweets}
        loading={loading}
        onNewPage={onNewPage}
      />
    </>
  );
};

export default Topics;
