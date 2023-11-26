import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from '@/components/Pagination';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import mockRouter from 'next-router-mock';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

describe('the pagination component updates URL query parameter when page changes', () => {
  const page = 3;
  const totalCount = 500;

  beforeEach(() => {
    mockRouter.push({ query: { page: `${page}` } });

    render(
      <RouterContext.Provider value={mockRouter}>
        <Pagination totalCount={totalCount} />
      </RouterContext.Provider>
    );
  });

  test('next page click', async () => {
    await userEvent.click(screen.getByTestId('button-next-page'));
    const nextPage = page + 1;
    expect(mockRouter.query.page).toBe(nextPage);
  });

  test('prev page click', async () => {
    await userEvent.click(screen.getByTestId('button-prev-page'));
    const prevPage = page - 1;
    expect(mockRouter.query.page).toBe(prevPage);
  });
});
