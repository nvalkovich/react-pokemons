import 'whatwg-fetch';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import NotFoundPage from '@/pages/404';
jest.mock('next/router', () => jest.requireActual('next-router-mock'));

describe('PageNotFound', () => {
  test('404 page displays message', () => {
    render(
      <RouterContext.Provider value={mockRouter}>
        <NotFoundPage />,
      </RouterContext.Provider>
    );

    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });
});
