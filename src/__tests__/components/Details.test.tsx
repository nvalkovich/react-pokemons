import 'whatwg-fetch';
import '@testing-library/jest-dom';
import { screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Details from '../../components/Details';
import Card from '../../components/Card';
import userEvent from '@testing-library/user-event';
import { mockCardList } from '../../__mocks__/FakeData';
import { renderWithProviders } from '../../test-utils';

const data = mockCardList[0];

describe('Details loader', () => {
  beforeEach(() => {
    renderWithProviders(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Card data={data} />} />
          <Route path="/details" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );
  });

  test('a loading indicator is displayed while fetching data', async () => {
    await userEvent.click(screen.getByTestId('card'));
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  test('the detailed card component correctly displays the detailed card data', async () => {
    await userEvent.click(screen.getByTestId('card'));
    await waitFor(() => {
      expect(screen.getByText(data.name)).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByText(data.supertype)).toBeInTheDocument();
      expect(screen.getByText(data.subtypes.join(', '))).toBeInTheDocument();
      expect(screen.getByText(data.types.join(', '))).toBeInTheDocument();
      expect(screen.getByText(data.hp)).toBeInTheDocument();
      expect(screen.getByText(data.rarity)).toBeInTheDocument();
      expect(screen.getByAltText(data.name)).toBeInTheDocument();
      expect(screen.getByText(data.flavorText)).toBeInTheDocument();
    });
  });

  test('clicking the close button hides the component', async () => {
    await userEvent.click(screen.getByTestId('card'));
    await waitFor(() => {
      expect(screen.getByTestId('close-btn')).toBeInTheDocument();
    });

    await userEvent.click(screen.getByTestId('close-btn'));
    await waitFor(() => {
      expect(screen.queryByTestId('details')).toBeNull();
    });
  });
});
