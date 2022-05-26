import { combineReducers } from 'redux';
import { tweetsReducer, tweetsSliceName } from '@/store/reducers/tweets';

export const rootReducer = combineReducers({
  [tweetsSliceName]: tweetsReducer
});
