import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from '@/components/Pagination';
import { createMockRouter } from '@/__mocks__/MockRouter';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

const page = 3;
const totalCount = 500;
const router = createMockRouter({ query: { page: `${page}` } });

describe('the pagination component updates URL query parameter when page changes', () => {
  beforeEach(() => {
    render(
      <RouterContext.Provider value={router}>
        <Pagination totalCount={totalCount} />
      </RouterContext.Provider>
    );
  });

  test('next page click', async () => {
    await userEvent.click(screen.getByTestId('button-next-page'));
    const nextPage = page + 1;
    expect(router.push).toHaveBeenCalledWith({
      pathname: '/',
      query: { page: nextPage },
    });
  });

  test('prev page click', async () => {
    await userEvent.click(screen.getByTestId('button-prev-page'));
    const prevPage = page - 1;
    expect(router.push).toHaveBeenCalledWith({
      pathname: '/',
      query: { page: prevPage },
    });
  });
});
