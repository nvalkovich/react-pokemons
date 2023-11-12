import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Card from '../components/Card';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Details from '../components/Details';
import { getCard } from '../Api';

const data = {
  id: 'smp-SM112',
  name: "Ash's Pikachu",
  supertype: 'Pokémon',
  subtypes: ['Basic'],
  hp: '70',
  types: ['Lightning'],
  attacks: [
    {
      name: 'Quick Attack',
      cost: ['Colorless'],
      convertedEnergyCost: '1',
      damage: '10+',
      text: 'Flip a coin. If heads, this attack does 10 more damage.',
    },
    {
      name: 'Electro Ball',
      cost: ['Lightning', 'Colorless', 'Colorless'],
      convertedEnergyCost: '3',
      damage: '50',
      text: '',
    },
  ],
  rarity: 'Promo',
  flavorText:
    'This form of Pikachu is somewhat rare. It wears the hat of its Trainer, who is also its partner.',
  images: {
    small: 'https://images.pokemontcg.io/smp/SM112.png',
    large: 'https://images.pokemontcg.io/smp/SM112_hires.png',
  },
};

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(data),
  })
) as jest.Mock;

jest.mock('../Api');

describe('Card', () => {
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

  test('clicking on a card opens a detailed card component', async () => {
    (getCard as jest.Mock).mockResolvedValue(data);
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Card data={data} />} />
          <Route path="/details" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );

    await userEvent.click(screen.getByTestId('card'));
    expect(await screen.findByTestId('details')).toBeInTheDocument();
  });

  test('clicking triggers an additional API call to fetch detailed information', async () => {
    (getCard as jest.Mock).mockResolvedValue(data);

    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Card data={data} />} />
          <Route path="/details" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );

    await userEvent.click(screen.getByTestId('card'));
    expect(getCard).toHaveBeenCalled();
  });
});
