import {
  configureStore,
  combineReducers,
  ThunkAction,
  Action
} from '@reduxjs/toolkit';
// 持久化数据
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import skeletonSliceReducer from './reducer/skeletonSlice';

import layoutSlice from './reducer/layoutSlice';

const rootReducer = combineReducers({
  skeletonSliceReducer,
  layout: layoutSlice
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage: storage,
  blacklist: ['layout']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // 忽略了 Redux Persist 调度的所有操作类型。这样做是为了在浏览器控制台读取a non-serializable value was detected in the state时不会出现错误。
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

export const persistor = persistStore(store);

export const clearPersistorStorage = () => persistor.purge();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
