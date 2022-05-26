import { RootState } from '@/store';
import { ITweet } from '@/models/tweet';
import { createSelector } from '@reduxjs/toolkit';

export const selectTweets = (state: RootState): ITweet[] => state.tweets.tweets;

export const selectSortedTweets = createSelector(selectTweets, (tweets: ITweet[]) => {
  return [...tweets].sort((a, b) => b.timestamp.cmp(a.timestamp));
});
