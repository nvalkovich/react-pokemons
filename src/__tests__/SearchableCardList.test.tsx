import '@testing-library/jest-dom';
import { act, render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { searchCardsByName } from '../Api';
import SearchableCardList from '../components/SearchableCardList';
import { fakeCardList } from '../__mocks__/FakeData';

jest.mock('../Api');

describe('SearchableCardList', () => {
  test('the component triggers API call to get cards', async () => {
    (searchCardsByName as jest.Mock).mockResolvedValue(fakeCardList);

    await act(async () =>
      render(
        <Router>
          <SearchableCardList />
        </Router>
      )
    );

    expect(searchCardsByName).toHaveBeenCalled();
  });
});
