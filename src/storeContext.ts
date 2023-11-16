import { createContext } from 'react';
import { CardData } from './types/interfaces';

type StoreContextValue = {
  searchQuery: string;
  list: CardData[];
};

export const StoreContext = createContext<StoreContextValue>({
  searchQuery: '',
  list: [],
});
