import 'whatwg-fetch';
import '@testing-library/jest-dom';
import { act, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Pagination from '../../components/Pagination';
import { useState } from 'react';
import { renderWithProviders } from '../../test-utils';
import { setupStore } from '../../store';
import { setPage, setTotalCount } from '../../store/paginationSlice';

const store = setupStore();
store.dispatch(setTotalCount(20));

let mockSearchParam = '';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: () => {
    const [params, setParams] = useState(new URLSearchParams(mockSearchParam));
    return [
      params,
      (newParams: string) => {
        mockSearchParam = newParams;
        setParams(new URLSearchParams(newParams));
      },
    ];
  },
}));

describe('the pagination component updates URL query parameter when page changes', () => {
  beforeEach(() => {
    renderWithProviders(
      <MemoryRouter>
        <Pagination />
      </MemoryRouter>,
      { store }
    );
  });

  test('next page click', async () => {
    await userEvent.click(screen.getByTestId('button-next-page'));
    const queryString = new URLSearchParams(mockSearchParam).toString();
    expect(queryString).toContain('page=2');
  });

  test('prev page click', async () => {
    act(() => {
      store.dispatch(setPage(2));
    });

    await userEvent.click(screen.getByTestId('button-prev-page'));
    const queryString = new URLSearchParams(mockSearchParam).toString();
    expect(queryString).toContain('page=1');
  });
});
