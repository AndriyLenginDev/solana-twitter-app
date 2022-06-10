import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITweet } from '@/models/tweet';
import {
  IAddTweetAction,
  IAddTweetsAction,
  IDeleteTweetAction,
  IGetTweetsAction,
  IGetTweetsNextPageAction,
  ISetFilterAction,
  ISetTweetsAction,
  IUpdateTweetAction
} from '@/store/reducers/tweets/types';
import { MemcmpFilter } from '@solana/web3.js';

export interface ITweetsState {
  tweets: ITweet[];
  loading: boolean;
  filter: MemcmpFilter[];
  page: number;
  limit: number;
  total: number;
}

export const initialState: ITweetsState = {
  tweets: [],
  loading: false,
  filter: [],
  page: 1,
  limit: 10,
  total: 0
};

export const tweetsSliceName = 'tweets';
const tweetsSlice = createSlice({
  name: tweetsSliceName,
  initialState,
  reducers: {
    resetState() {
      return initialState;
    },
    setTweets(state, action: ISetTweetsAction) {
      state.tweets = action.payload;
      return state;
    },
    resetTweets(state) {
      state.tweets = [];
      state.filter = [];
      return state;
    },
    addTweets(state, action: IAddTweetsAction) {
      state.tweets.push(...action.payload);
      return state;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
      return state;
    },
    setFilter(state, action: ISetFilterAction) {
      state.filter = action.payload;
      return state;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
      return state;
    },
    setTotal(state, action: PayloadAction<number>) {
      state.total = action.payload;
      return state;
    },
    getTweets(state, action: IGetTweetsAction) {
      return state;
    },
    addTweet(state, action: IAddTweetAction) {
      return state;
    },
    deleteTweet(state, action: IDeleteTweetAction) {
      return state;
    },
    updateTweet(state, action: IUpdateTweetAction) {
      const index = state.tweets.findIndex((t) => t.key === action.payload.key);
      if (index !== -1) {
        state.tweets[index] = action.payload;
      }
      return state;
    },
    getTweetsNextPage(state, action: IGetTweetsNextPageAction) {
      return state;
    }
  }
});

export const tweetsActions = tweetsSlice.actions;
export const tweetsReducer = tweetsSlice.reducer;
