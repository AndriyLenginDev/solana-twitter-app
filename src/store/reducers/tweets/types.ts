import { PayloadAction } from '@reduxjs/toolkit';
import { ITweet } from '@/models/tweet';

export type ISetTweetsAction = PayloadAction<ITweet[]>;
export type IAddTweetsAction = PayloadAction<ITweet[]>;
export type IGetTweetsAction = PayloadAction<any[] | undefined>;
export type IAddTweetAction = PayloadAction<ITweet>;
export type IDeleteTweetAction = PayloadAction<ITweet>;
export type IGetTweetsNextPageAction = PayloadAction<any[] | undefined>;
