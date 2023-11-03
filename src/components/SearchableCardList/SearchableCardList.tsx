import { useEffect, useState } from 'react';
import SearchInput from '../SearchInput';
import CardList from '../CardList';
import { CardData } from '../../types/interfaces';
import Api from '../../Api';
import Loader from '../Loader';
import './SearchableCardList.css';
const api = new Api();

export default function SearchableCardList() {
  const searchQueryKey = 'searchQuery';
  const searchQueryFromLS = localStorage.getItem(searchQueryKey) || '';

  const [searchQuery, setSearchQuery] = useState(searchQueryFromLS);
  const [isFetching, setFetching] = useState(false);
  const [list, setList] = useState<CardData[]>([]);

  async function handleSearch(query: string) {
    localStorage.setItem(searchQueryKey, query);
    setFetching(true);

    try {
      const data = await api.searchCardsByName(query);
      setList(data);
      setSearchQuery(query);
    } finally {
      setFetching(false);
    }
  }

  useEffect(() => {
    const search = async () => {
      await handleSearch(searchQuery);
    };

    search().catch(console.error);
  }, [searchQuery]);

  return (
    <>
      <div className="search-section">
        <h1 className="title">Pokémon cards</h1>
        <SearchInput value={searchQuery} onSearch={handleSearch} />
      </div>
      <div className="cards-section">
        {isFetching ? <Loader /> : <CardList list={list} />}
      </div>
    </>
  );
}
