import {
  configureStore,
  combineReducers,
  PreloadedState,
} from '@reduxjs/toolkit';
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

export const rootReducer = combineReducers({
  search: searchReducer,
  pagination: paginationReducer,
  loading: loadingReducer,
  [pokemonCardsApi.reducerPath]: pokemonCardsApi.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [pokemonCardsApi.reducerPath, 'search'],
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: persistedReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(pokemonCardsApi.middleware),
  });
};

const store = setupStore({});

export default store;

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
