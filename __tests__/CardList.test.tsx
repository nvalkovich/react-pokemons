import '@testing-library/jest-dom';
import CardList from '@/components/CardList';
import { render, screen } from '@testing-library/react';
import { mockCardList as list } from '@/__mocks__/MockData';
import { createMockRouter } from '@/__mocks__/MockRouter';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

const router = createMockRouter({});

describe('CardList without cards', () => {
  test('an appropriate message is displayed if no cards are present.', () => {
    render(
      <RouterContext.Provider value={router}>
        <CardList list={[]} />
      </RouterContext.Provider>
    );

    expect(screen.getByText(/No cards were found/i)).toBeInTheDocument();
  });
});

describe('CardList with cards', () => {
  beforeEach(() => {
    render(
      <RouterContext.Provider value={router}>
        <CardList list={list} />
      </RouterContext.Provider>
    );
  });

  test('it renders cards', () => {
    expect(screen.getByTestId('card-list')).toBeInTheDocument();
  });

  test('it renders the specified number of cards', async () => {
    const cards = await screen.findAllByText(/level/i);
    expect(cards).toHaveLength(list.length);
  });
});
