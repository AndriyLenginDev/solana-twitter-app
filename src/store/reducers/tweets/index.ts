import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITweet } from '@/models/tweet';
import {
  IGetTweetsAction,
  ISendTweetAction,
  ISetTweetsAction
} from '@/store/reducers/tweets/types';

export interface ITweetsState {
  tweets: ITweet[];
  tweetsLoading: boolean;
  sendLoading: boolean;
}

export const initialState: ITweetsState = {
  tweets: [],
  tweetsLoading: false,
  sendLoading: false
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
    setTweetsLoading(state, action: PayloadAction<boolean>) {
      state.tweetsLoading = action.payload;
      return state;
    },
    getTweets(state, action: IGetTweetsAction) {
      return state;
    },
    setSendLoading(state, action: PayloadAction<boolean>) {
      state.sendLoading = action.payload;
      return state;
    },
    sendTweet(state, action: ISendTweetAction) {
      return state;
    }
  }
});

export const tweetsActions = tweetsSlice.actions;
export const tweetsReducer = tweetsSlice.reducer;
