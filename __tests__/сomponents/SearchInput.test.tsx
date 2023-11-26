import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchInput from '@/components/SearchInput';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import mockRouter from 'next-router-mock';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

describe('SearchInput', () => {
  beforeEach(() => {
    render(
      <RouterContext.Provider value={mockRouter}>
        <SearchInput />
      </RouterContext.Provider>
    );
  });

  test('clicking the Search button update query params', async () => {
    const searchInput: HTMLInputElement = screen.getByTestId('search-input');

    const searchButton = screen.getByTestId('search-button');
    await userEvent.click(searchButton);

    expect(mockRouter).toMatchObject({
      pathname: '/',
      query: { page: '1', q: `${searchInput.value}` },
    });
  });
});
