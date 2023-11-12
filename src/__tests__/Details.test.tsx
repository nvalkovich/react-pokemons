import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Details from '../components/Details';
import { getCard } from '../Api';
import Card from '../components/Card';
import userEvent from '@testing-library/user-event';
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

jest.mock('../Api');

describe('details', () => {
  test('a loading indicator is displayed while fetching data', async () => {
    (getCard as jest.Mock).mockResolvedValue(
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(data);
        }, 5000);
      })
    );

    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Card data={data} />} />
          <Route path="/details" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );

    await userEvent.click(screen.getByTestId('card'));
    expect(await screen.getByTestId('loader')).toBeInTheDocument();
  });

  test('the detailed card component correctly displays the detailed card data', async () => {
    (getCard as jest.Mock).mockResolvedValue(
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(data);
        }, 0);
      })
    );

    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Card data={data} />} />
          <Route path="/details" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );

    await userEvent.click(screen.getByTestId('card'));
    expect(screen.getByText(data.name)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText(data.supertype)).toBeInTheDocument();
    expect(screen.getByText(data.subtypes.join(', '))).toBeInTheDocument();
    expect(screen.getByText(data.types.join(', '))).toBeInTheDocument();
    expect(screen.getByText(data.hp)).toBeInTheDocument();
    expect(
      screen.getByText(data.attacks?.map((attack) => attack.name).join(', '))
    ).toBeInTheDocument();
    expect(screen.getByText(data.rarity)).toBeInTheDocument();
    expect(screen.getByAltText(data.name)).toBeInTheDocument();
    expect(screen.getByText(data.flavorText)).toBeInTheDocument();
  });

  test('the detailed card component correctly displays the detailed card data', async () => {
    (getCard as jest.Mock).mockResolvedValue(
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(data);
        }, 0);
      })
    );

    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Card data={data} />} />
          <Route path="/details" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );

    await userEvent.click(screen.getByTestId('card'));
    expect(screen.getByTestId('details')).toBeInTheDocument();

    const closeBtn = screen.getByRole('button');
    await userEvent.click(closeBtn);
    expect(screen.queryByTestId('details')).toBeNull();
  });
});
