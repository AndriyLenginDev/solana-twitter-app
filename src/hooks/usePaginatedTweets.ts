import { useCallback, useEffect, useMemo } from 'react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { tweetsActions } from '@/store/reducers/tweets';
import { MemcmpFilter } from '@solana/web3.js';

export type PageFilter = (...args: any) => MemcmpFilter;

export interface PaginatedTweetsResult {
  onNewPage: () => void;
}

export const usePaginatedTweets = (
  filter?: PageFilter,
  param?: string,
  paramRequired?: boolean
): PaginatedTweetsResult => {
  const dispatch = useAppDispatch();
  const cachedFilter = useMemo<MemcmpFilter[] | undefined>(() => {
    if (filter && param) {
      return [filter(param)];
    }
    return [];
  }, [filter, param]);

  const onNewPage = useCallback(() => {
    if (paramRequired) {
      if (param) {
        dispatch(tweetsActions.getTweetsNextPage(cachedFilter));
      }
    } else {
      dispatch(tweetsActions.getTweetsNextPage(cachedFilter));
    }
  }, [paramRequired, dispatch, cachedFilter, param]);

  useEffect(() => {
    if (paramRequired) {
      if (param) {
        dispatch(tweetsActions.getTweets(cachedFilter));
      }
    } else {
      dispatch(tweetsActions.getTweets(cachedFilter));
    }
    return () => {
      dispatch(tweetsActions.setTweets([]));
    };
  }, [paramRequired, dispatch, cachedFilter, param]);

  return { onNewPage };
};
