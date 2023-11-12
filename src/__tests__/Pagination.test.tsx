import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Pagination from '../components/Pagination';
import { useState } from 'react';
import { fakePaginationData } from '../__mocks__/FakeData';

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

const OnPageChangeMockFn = jest.fn().mockImplementation((page) => {
  mockSearchParam = `page=${page}`;
});

const page = fakePaginationData.page;

describe('the pagination component updates URL query parameter when page changes', () => {
  beforeEach(() => {
    render(
      <Router>
        <Pagination
          page={page}
          pageSize={fakePaginationData.pageSize}
          totalCount={fakePaginationData.totalCount}
          onPageChange={OnPageChangeMockFn}
          onPageSizeChange={jest.fn()}
        />
      </Router>
    );
  });

  test('next page click', async () => {
    await userEvent.click(screen.getByTestId('button-next-page'));
    expect(mockSearchParam).toContain(`page=${page + 1}`);
  });

  test('prev page click', async () => {
    await userEvent.click(screen.getByTestId('button-prev-page'));
    expect(mockSearchParam).toContain(`page=${page - 1}`);
  });
});
