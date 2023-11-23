import '@testing-library/jest-dom';
import CardList from '../../components/CardList';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { mockCardList as list } from '../../__mocks__/FakeData';

describe('CardList without cards', () => {
  test('an appropriate message is displayed if no cards are present.', () => {
    render(
      <Router>
        <CardList list={[]} />
      </Router>
    );

    expect(screen.getByText(/No cards were found/i)).toBeInTheDocument();
  });
});

describe('CardList with cards', () => {
  beforeEach(() => {
    render(
      <Router>
        <CardList list={list} />
      </Router>
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
