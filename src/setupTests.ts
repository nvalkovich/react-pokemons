import '@testing-library/jest-dom';
import { server } from './__mocks__/api/server';
import { pokemonCardsApi } from './services/pokemonCardsApi';
import { setupStore } from './store';

const store = setupStore({});

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
  store.dispatch(pokemonCardsApi.util.resetApiState());
});

afterAll(() => server.close());
