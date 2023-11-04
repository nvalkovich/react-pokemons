import { useEffect, useState } from 'react';
import SearchInput from '../SearchInput';
import CardList from '../CardList';
import { CardData } from '../../types/interfaces';
import Api from '../../Api';
import Loader from '../Loader';
import './SearchableCardList.css';
import Pagination from '../Pagination';

const searchQueryKey = 'searchQuery';
const api = new Api();

export default function SearchableCardList() {
  const [searchQuery, setSearchQuery] = useState(
    localStorage.getItem(searchQueryKey) || ''
  );
  const [isFetching, setFetching] = useState(false);
  const [list, setList] = useState<CardData[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [totalCount, setTotalCount] = useState(0);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  const onPageChange = (page: number) => {
    setPage(page);
  };

  const onPageSizeChange = (pageSize: number) => {
    setPageSize(pageSize);
    setPage(1);
  };

  useEffect(() => {
    const search = async () => {
      localStorage.setItem(searchQueryKey, searchQuery);
      setFetching(true);

      try {
        const cards = await api.searchCardsByName(searchQuery, page, pageSize);
        setList(cards.data);
        setTotalCount(cards.totalCount);
      } finally {
        setFetching(false);
      }
    };

    search().catch(console.error);
  }, [searchQuery, page, pageSize]);

  return (
    <>
      <div className="search-section">
        <h1 className="title">Pokémon cards</h1>
        <SearchInput value={searchQuery} onSearch={handleSearch} />
      </div>
      <div className="cards-section">
        {isFetching ? <Loader /> : <CardList list={list} />}
      </div>
      <div className="pagination-section">
        <Pagination
          page={page}
          pageSize={pageSize}
          totalCount={totalCount}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      </div>
    </>
  );
}
