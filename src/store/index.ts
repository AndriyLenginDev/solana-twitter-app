import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { rootReducer } from '@/store/reducers';
import { middlewares, sagaMiddleware } from '@/store/middlewares';
import rootSaga from '@/store/sagas';

const setupStore = (preloadedState = {}) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: [
      ...getDefaultMiddleware({
        serializableCheck: false
      }),
      ...middlewares
    ]
  });
};

export const store = setupStore();
export const runSagas = (): unknown => sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export default store;
