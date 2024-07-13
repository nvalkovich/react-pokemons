import { CardData } from '@/types/interfaces';
import SearchInput from './SearchInput';
import CardList from './CardList';
import Pagination from './Pagination';
import styles from '../styles/SearchableCardList.module.css';

type SearchableCardListProps = {
  list: CardData[];
  totalCount: number;
};

export default function SearchableCardList({
  list,
  totalCount,
}: SearchableCardListProps) {
  return (
    <>
      <div className="main-section" data-testid="main-section">
        <div className={styles.search} data-testid="search-section">
          <h1 className="title">Pokémon cards</h1>
          <SearchInput />
        </div>
        <div className={styles.cards} data-testid="cards-section">
          <CardList list={list} />
        </div>
        <div className={styles.pagination} data-testid="pagination-section">
          <Pagination totalCount={totalCount} />
        </div>
      </div>
    </>
  );
}
