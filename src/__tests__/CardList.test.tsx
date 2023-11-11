import '@testing-library/jest-dom';
import CardList from '../components/CardList';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { StoreContext } from '../storeContext';

const list = [
  { id: 'xy2-96', name: 'Sacred Ash', supertype: 'Trainer' },
  { id: 'pl2-92', name: "Lucian's Assignment", supertype: 'Trainer' },
  {
    id: 'smp-SM108',
    name: "Ash's Pikachu",
    supertype: 'Pokémon',
  },
];

describe('CardList', () => {
  test('an appropriate message is displayed if no cards are present.', () => {
    render(
      <Router>
        <CardList />
      </Router>
    );
    expect(screen.getByText(/No cards were found/i)).toBeInTheDocument();
  });

  test('it renders cards', () => {
    render(
      <Router>
        render(
        <StoreContext.Provider value={{ searchQuery: '', list }}>
          <CardList />
        </StoreContext.Provider>
        )
      </Router>
    );
    expect(screen.getByTestId('card-list')).toBeInTheDocument();
  });

  test('it renders the specified number of cards', async () => {
    render(
      <Router>
        render(
        <StoreContext.Provider value={{ searchQuery: '', list }}>
          <CardList />
        </StoreContext.Provider>
        )
      </Router>
    );

    const cards = await screen.findAllByText(/level/i);
    expect(cards).toHaveLength(list.length);
  });
});
