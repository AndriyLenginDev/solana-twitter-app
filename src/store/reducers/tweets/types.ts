import { PayloadAction } from '@reduxjs/toolkit';
import { ITweet } from '@/models/tweet';

export type ISetTweetsAction = PayloadAction<ITweet[]>;
export type IGetTweetsAction = PayloadAction<any[] | undefined>;
export type ISendTweetAction = PayloadAction<Pick<ITweet, 'content' | 'topic'>>;
