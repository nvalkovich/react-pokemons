import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { RootState, setupStore } from './store';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import type { RenderOptions } from '@testing-library/react';
import type { PreloadedState } from '@reduxjs/toolkit';
import { AppStore } from './store';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  setupListeners(store.dispatch);

  function Wrapper({ children }: PropsWithChildren<object>) {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
