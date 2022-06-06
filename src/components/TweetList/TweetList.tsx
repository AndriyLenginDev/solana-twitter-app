import React, { FC, useRef } from 'react';
import { ITweet } from '@/models/tweet';
import Loading from '@/components/Loading';
import TweetCard from '@/components/TweetCard/TweetCard';
import classes from './TweetList.module.scss';
import { useObserver } from '@/hooks/useObserver';


export interface TweetListProps {
  tweets: ITweet[];
  loading: boolean;
}

const TweetList: FC<TweetListProps> = ({ tweets, loading }) => {
  const lastElement = useRef<HTMLDivElement>(null);

  useObserver(lastElement, () => {
    console.log('callback');
  }, loading);
  return (
    <div className={classes.tweet__list}>
      {tweets.map((tweet) => (
        <TweetCard
          tweet={tweet}
          key={tweet.key}
        />
      ))}
      <div ref={lastElement} />
      {loading && <Loading />}
    </div>
  );
};

export default TweetList;
