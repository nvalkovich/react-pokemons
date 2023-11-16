import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Card from '../components/Card';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Details from '../components/Details';
import { getCard } from '../Api';
import { fakeCardList } from '../__mocks__/FakeData';

const data = fakeCardList[0];

jest.mock('../Api');

describe('Card render', () => {
  test('the card component renders the relevant card data', () => {
    render(
      <Router>
        <Card data={data} />
      </Router>
    );

    expect(screen.getByText('Level: Unknown')).toBeInTheDocument();
    expect(screen.getByText(data.name)).toBeInTheDocument();
    expect(screen.getByText(`Rarity: ${data.rarity}`)).toBeInTheDocument();
  });
});

describe('Card interaction', () => {
  beforeEach(() => {
    (getCard as jest.Mock).mockResolvedValue(data);

    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Card data={data} />} />
          <Route path="/details" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );
  });

  test('clicking on a card opens a detailed card component', async () => {
    await userEvent.click(screen.getByTestId('card'));
    expect(await screen.findByTestId('details')).toBeInTheDocument();
  });

  test('clicking triggers an additional API call to fetch detailed information', async () => {
    await userEvent.click(screen.getByTestId('card'));
    expect(getCard).toHaveBeenCalled();
  });
});
