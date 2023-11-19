import 'whatwg-fetch';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import SearchInput from '../../components/SearchInput';
import { localStorageMock } from '../../__mocks__/LocalStorageMock';
import { renderWithProviders } from '../../test-utils';

const { getItemMock, setItemMock } = localStorageMock();

describe('SearchInput', () => {
  beforeEach(() => {
    renderWithProviders(
      <Router>
        <SearchInput />
      </Router>
    );
  });

  test('clicking the Search button saves the entered value to the local storage', async () => {
    const searchInput: HTMLInputElement = screen.getByTestId('search-input');

    const searchButton = screen.getByTestId('search-button');
    await userEvent.click(searchButton);
    expect(setItemMock).toHaveBeenCalledWith('searchQuery', searchInput.value);
  });

  test('the component retrieves the value from the local storage upon mounting', async () => {
    expect(getItemMock).toHaveBeenCalledWith('searchQuery');
  });
});
