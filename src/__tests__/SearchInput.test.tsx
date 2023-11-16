import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import SearchInput from '../components/SearchInput';
import { localStorageMock } from '../__mocks__/LocalStorageMock';

const { getItemMock, setItemMock } = localStorageMock();

const onSearchClickMock = jest.fn().mockImplementation((searchQuery) => {
  setItemMock('searchQuery', searchQuery);
});

describe('SearchInput', () => {
  beforeEach(() => {
    render(
      <Router>
        <SearchInput onSearch={onSearchClickMock} />
      </Router>
    );
  });

  test('clicking the Search button saves the entered value to the local storage', async () => {
    const value = 'value';

    const searchInput = screen.getByTestId('search-input');
    await userEvent.type(searchInput, value);
    expect(searchInput).toHaveValue(value);

    const searchButton = screen.getByTestId('search-button');
    await userEvent.click(searchButton);
    expect(setItemMock).toHaveBeenCalledWith('searchQuery', value);
  });

  test('the component retrieves the value from the local storage upon mounting', async () => {
    expect(getItemMock).toHaveBeenCalledWith('searchQuery');
  });
});
