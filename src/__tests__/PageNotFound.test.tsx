import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import { MemoryRouter } from 'react-router-dom';
import Details from '../components/Details';
import NotFoundPage from '../components/NotFoundPage';
import SearchableCardList from '../components/SearchableCardList';

describe('PageNotFound', () => {
  test('404 page is displayed when navigating to an invalid route', () => {
    const route = '/test';

    render(
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/" element={<SearchableCardList />}>
            <Route index element={null} />
            <Route path="details" element={<Details />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });
});
