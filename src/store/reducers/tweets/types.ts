import { PayloadAction } from '@reduxjs/toolkit';
import { ITweet } from '@/models/tweet';
import { MemcmpFilter } from '@solana/web3.js';

export type ISetTweetsAction = PayloadAction<ITweet[]>;
export type ISetFilterAction = PayloadAction<MemcmpFilter[]>;
export type IAddTweetsAction = PayloadAction<ITweet[]>;
export type IGetTweetsAction = PayloadAction<MemcmpFilter[] | undefined>;
export type IAddTweetAction = PayloadAction<ITweet>;
export type IDeleteTweetAction = PayloadAction<ITweet>;
export type IGetTweetsNextPageAction = PayloadAction<any[] | undefined>;
