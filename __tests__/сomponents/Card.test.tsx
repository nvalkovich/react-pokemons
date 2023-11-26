import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Card from '@/components/Card';
import userEvent from '@testing-library/user-event';
import { mockCardList } from '@/__mocks__/MockData';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import mockRouter from 'next-router-mock';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

const data = mockCardList[0];

describe('Card render', () => {
  test('the card component renders the relevant card data', () => {
    render(
      <RouterContext.Provider value={mockRouter}>
        <Card data={data} />
      </RouterContext.Provider>
    );

    expect(screen.getByText('Level: Unknown')).toBeInTheDocument();
    expect(screen.getByText(data.name)).toBeInTheDocument();
    expect(screen.getByText(`Rarity: ${data.rarity}`)).toBeInTheDocument();
  });
});

describe('Card interaction', () => {
  beforeEach(() => {
    render(
      <RouterContext.Provider value={mockRouter}>
        <Card data={data} />
      </RouterContext.Provider>
    );
  });

  test('clicking on a card opens a detailed card component', async () => {
    const card = screen.getByTestId('card');
    await userEvent.click(card);

    expect(mockRouter.query).toEqual({
      details: `${data.id}`,
    });
  });
});
