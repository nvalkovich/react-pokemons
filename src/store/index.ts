import { configureStore, combineReducers } from '@reduxjs/toolkit';
import searchReducer from './searchSlice';
import { pokemonCardsApi } from '../services/pokemonCardsApi';
import paginationReducer from './paginationSlice';
import loadingReducer from './loadingSlice';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  search: searchReducer,
  pagination: paginationReducer,
  loading: loadingReducer,
  [pokemonCardsApi.reducerPath]: pokemonCardsApi.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [pokemonCardsApi.reducerPath],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(pokemonCardsApi.middleware),
});

export default store;

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
