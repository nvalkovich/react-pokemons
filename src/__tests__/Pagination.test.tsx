import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Pagination from '../components/Pagination';
import { useState } from 'react';

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

const pagintationProps = {
  page: 5,
  pageSize: 4,
  totalCount: 100,
  onPageChange: OnPageChangeMockFn,
  onPageSizeChange: jest.fn(),
};

const page = pagintationProps.page;

describe('pagination', () => {
  beforeEach(() => {
    render(
      <Router>
        <Pagination
          page={page}
          pageSize={pagintationProps.pageSize}
          totalCount={pagintationProps.totalCount}
          onPageChange={pagintationProps.onPageChange}
          onPageSizeChange={pagintationProps.onPageSizeChange}
        />
      </Router>
    );
  });
  test('the component updates URL query parameter when page changes', async () => {
    await userEvent.click(screen.getByTestId('button-next-page'));
    expect(mockSearchParam).toContain(`page=${page + 1}`);
  });

  test('prev', async () => {
    await userEvent.click(screen.getByTestId('button-prev-page'));
    expect(mockSearchParam).toContain(`page=${page - 1}`);
  });
});
