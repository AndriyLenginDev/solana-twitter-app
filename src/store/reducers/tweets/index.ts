import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITweet } from '@/models/tweet';
import {
  IAddTweetAction,
  IDeleteTweetAction,
  IGetTweetsAction,
  ISetTweetsAction
} from '@/store/reducers/tweets/types';

export interface ITweetsState {
  tweets: ITweet[];
  loading: boolean;
}

export const initialState: ITweetsState = {
  tweets: [],
  loading: false
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
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
      return state;
    },
    getTweets(state, action: IGetTweetsAction) {
      return state;
    },
    addTweet(state, action: IAddTweetAction) {
      state.tweets.push(action.payload);
      return state;
    },
    deleteTweet(state, action: IDeleteTweetAction) {
      return state;
    },
    updateTweet(state, action: IDeleteTweetAction) {
      const index = state.tweets.findIndex((t) => t.key === action.payload.key);
      if (index !== -1) {
        state.tweets[index] = action.payload;
      }
      return state;
    }
  }
});

export const tweetsActions = tweetsSlice.actions;
export const tweetsReducer = tweetsSlice.reducer;
