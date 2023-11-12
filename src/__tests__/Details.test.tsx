import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Details from '../components/Details';
import { getCard } from '../Api';
import Card from '../components/Card';
import userEvent from '@testing-library/user-event';
import { cardData as data } from '../test/data';

jest.mock('../Api');

describe('Details loader', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Card data={data} />} />
          <Route path="/details" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );
  });

  test('a loading indicator is displayed while fetching data', async () => {
    (getCard as jest.Mock).mockResolvedValue(
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(data);
        }, 5000);
      })
    );

    await userEvent.click(screen.getByTestId('card'));
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  test('the detailed card component correctly displays the detailed card data', async () => {
    (getCard as jest.Mock).mockResolvedValue(data);

    await userEvent.click(screen.getByTestId('card'));

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

  test('clicking the close button hides the component', async () => {
    (getCard as jest.Mock).mockResolvedValue(data);

    await userEvent.click(screen.getByTestId('card'));
    expect(screen.getByTestId('details')).toBeInTheDocument();

    const closeBtn = screen.getByRole('button');
    await userEvent.click(closeBtn);
    expect(screen.queryByTestId('details')).toBeNull();
  });
});
