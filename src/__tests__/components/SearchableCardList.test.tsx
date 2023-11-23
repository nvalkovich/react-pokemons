import 'whatwg-fetch';
import '@testing-library/jest-dom';
import { act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import SearchableCardList from '../../components/SearchableCardList';
import { renderWithProviders } from '../../test-utils';
import * as pokemonCardsApi from '../../services/pokemonCardsApi';

describe('SearchableCardList', () => {
  const spyAPIcall = jest.spyOn(pokemonCardsApi, 'useSearchCardsQuery');
  test('the component triggers API call to get cards', async () => {
    await act(async () =>
      renderWithProviders(
        <Router>
          <SearchableCardList />
        </Router>
      )
    );

    expect(spyAPIcall).toHaveBeenCalled();
  });
});
