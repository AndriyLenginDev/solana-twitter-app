import { RootState } from '@/store';
import { ITweet } from '@/models/tweet';
import { createSelector } from '@reduxjs/toolkit';

export const selectTweets = (state: RootState): ITweet[] => state.tweets.tweets;

export const selectLoading = (state: RootState): boolean => state.tweets.loading;

export const selectPage = (state: RootState): number => state.tweets.page;

export const selectLimit = (state: RootState): number => state.tweets.limit;

export const selectTotal = (state: RootState): number => state.tweets.total;

export const selectSortedTweets = createSelector(selectTweets, (tweets: ITweet[]): ITweet[] => {
  return [...tweets].sort((a, b) => b.timestamp.cmp(a.timestamp));
});

export const hasNextPage = createSelector(
  [selectPage, selectLimit, selectTotal],
  (page, limit, total): boolean => {
    return page * limit < total;
  }
);
