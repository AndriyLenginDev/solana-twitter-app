import React, { FC, useEffect } from 'react';
import TopicsForm from '@/components/TopicsForm/TopicsForm';
import TweetForm from '@/components/TweetForm/TweetForm';
import TweetList from '@/components/TweetList/TweetList';
import { tweetsActions } from '@/store/reducers/tweets';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectSortedTweets } from '@/store/reducers/tweets/selectors';
import { useParams } from 'react-router-dom';

const Topics: FC = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.tweets.loading);
  const tweets = useAppSelector(selectSortedTweets);
  const { topic } = useParams();

  useEffect(() => {
    if (topic) {
      // TODO: use filter by "topic"
      dispatch(
        tweetsActions.getTweets([
          /* filters */
        ])
      );
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
