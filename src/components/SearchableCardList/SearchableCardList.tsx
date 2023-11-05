import { useEffect, useState } from 'react';
import SearchInput from '../SearchInput';
import CardList from '../CardList';
import { CardData } from '../../types/interfaces';
import Api from '../../Api';
import Loader from '../Loader';
import './SearchableCardList.css';
import Pagination from '../Pagination';
import {
  Outlet,
  useNavigate,
  useLocation,
  useSearchParams,
} from 'react-router-dom';

const searchQueryKey = 'searchQuery';
const api = new Api();

export default function SearchableCardList() {
  const [searchQuery, setSearchQuery] = useState(
    localStorage.getItem(searchQueryKey) || ''
  );
  const [isFetching, setFetching] = useState(false);
  const [list, setList] = useState<CardData[]>([]);

  const [searchParams, setSearchParms] = useSearchParams();
  const page = +(searchParams.get('page') ?? '1');

  const [pageSize, setPageSize] = useState(20);
  const [totalCount, setTotalCount] = useState(0);

  const navigate = useNavigate();

  const location = useLocation();
  const isShaded = location.pathname === '/details';

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSearchParms({ page: '1' });
  };

  const onPageChange = (page: number) => {
    searchParams.set('page', page.toString());
    navigate({ search: searchParams.toString() });
  };

  const onPageSizeChange = (pageSize: number) => {
    setPageSize(pageSize);
    setSearchParms({ page: '1' });
  };

  const onWrapperClick = () => {
    searchParams.delete('id');
    navigate({ pathname: '/', search: searchParams.toString() });
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

  const leftSectionContent = (
    <div className="left-section">
      <div className="search-section">
        <h1 className="title">Pokémon cards</h1>
        <SearchInput value={searchQuery} onSearch={handleSearch} />
      </div>
      {isFetching ? (
        <div className="cards-loader-container">
          <Loader />
        </div>
      ) : (
        <>
          <div className="cards-section">
            <CardList list={list} />
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
      )}
    </div>
  );

  return (
    <>
      {isShaded ? (
        <div className="shaded-wrapper" onClick={onWrapperClick}>
          {leftSectionContent}
        </div>
      ) : (
        leftSectionContent
      )}
      <div className="right-section">
        <Outlet />
      </div>
    </>
  );
}
