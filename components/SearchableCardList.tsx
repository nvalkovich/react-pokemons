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
      <div className="main-section">
        <div className={styles.search}>
          <h1 className="title">Pokémon cards</h1>
          <SearchInput />
        </div>
        <div className={styles.cards}>
          <CardList list={list} />
        </div>
        <div className={styles.pagination}>
          <Pagination totalCount={totalCount} />
        </div>
      </div>
    </>
  );
}
