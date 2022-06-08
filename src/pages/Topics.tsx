import React, { FC } from 'react';
import TopicsForm from '@/components/TopicsForm/TopicsForm';
import TweetForm from '@/components/TweetForm/TweetForm';
import TweetList from '@/components/TweetList/TweetList';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectLoading, selectSortedTweets } from '@/store/reducers/tweets/selectors';
import { useParams } from 'react-router-dom';
import { topicFilter } from '@/web3/filters';
import { usePaginatedTweets } from '@/hooks/usePaginatedTweets';

const Topics: FC = () => {
  const loading = useAppSelector(selectLoading);
  const tweets = useAppSelector(selectSortedTweets);
  const { topic } = useParams();
  const { onNewPage } = usePaginatedTweets(topicFilter, topic, true);

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
