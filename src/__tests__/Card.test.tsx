import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Card from '../components/Card';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Details from '../components/Details';
import { getCard } from '../Api';

const data = {
  id: 'xy2-96',
  name: 'Sacred Ash',
  supertype: 'Trainer',
  rarity: 'rare',
};

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(data),
  })
) as jest.Mock;

jest.mock('../Api');
(getCard as jest.Mock).mockResolvedValue(data);

describe('Card', () => {
  test('an appropriate message is displayed if no cards are present', () => {
    render(
      <Router>
        <Card data={data} />
      </Router>
    );
    expect(screen.getByText('Level: Unknown')).toBeInTheDocument();
    expect(screen.getByText(data.name)).toBeInTheDocument();
    expect(screen.getByText(`Rarity: ${data.rarity}`)).toBeInTheDocument();
  });

  test('clicking on a card opens a detailed card component', async () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Card data={data} />} />
          <Route path="/details" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );

    userEvent.click(screen.getByTestId('card'));
    expect(await screen.findByTestId('details')).toBeInTheDocument();
  });

  test('clicking triggers an additional API call to fetch detailed information', async () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Card data={data} />} />
          <Route path="/details" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );

    userEvent.click(screen.getByTestId('card'));
    expect(getCard).toHaveBeenCalledTimes(1);
  });
});
