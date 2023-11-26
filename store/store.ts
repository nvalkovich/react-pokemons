import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { pokemonCardsApi } from '@/services/pokemonCardsApi';

export interface State {
  tick: string;
}

export const makeStore = () =>
  configureStore({
    reducer: {
      [pokemonCardsApi.reducerPath]: pokemonCardsApi.reducer,
    },
    middleware: (gDM) => gDM().concat(pokemonCardsApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
