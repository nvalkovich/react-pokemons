import { useEffect, useState } from 'react';
import SearchInput from '../SearchInput';
import CardList from '../CardList';
import { CardData } from '../../types/interfaces';
import Loader from '../Loader';
import './SearchableCardList.css';
import Pagination from '../Pagination';
import {
  Outlet,
  useNavigate,
  useLocation,
  useSearchParams,
} from 'react-router-dom';
import { StoreContext } from '../../storeContext';
import { searchCardsByName } from '../../Api';
import { useAppSelector } from '../../store/hooks';

export default function SearchableCardList() {
  const searchQuery = useAppSelector((state) => state.search.searchQuery);
  const itemsPerPage = useAppSelector((state) => state.pagination.itemsPerPage);
  const currentPage = useAppSelector((state) => state.pagination.page);

  const [isFetching, setFetching] = useState(false);
  const [list, setList] = useState<CardData[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    searchParams.set('page', currentPage.toString());
    setSearchParams(searchParams);
  }, [currentPage, searchParams, setSearchParams]);

  const [totalCount, setTotalCount] = useState(0);

  const navigate = useNavigate();

  const location = useLocation();
  const isShaded = location.pathname === '/details';

  const onWrapperClick = () => {
    searchParams.delete('id');
    navigate({ pathname: '/', search: searchParams.toString() });
  };

  useEffect(() => {
    const search = async () => {
      setFetching(true);

      try {
        const cards = await searchCardsByName(
          searchQuery,
          currentPage,
          itemsPerPage
        );
        setList(cards.data);
        setTotalCount(cards.totalCount);
      } finally {
        setFetching(false);
      }
    };

    search().catch(console.error);
  }, [searchQuery, currentPage, itemsPerPage]);

  const leftSectionContent = (
    <div className="left-section">
      <div className="search-section">
        <h1 className="title">Pokémon cards</h1>
        <SearchInput />
      </div>
      {isFetching ? (
        <div className="cards-loader-container">
          <Loader />
        </div>
      ) : (
        <>
          <div className="cards-section">
            <CardList />
          </div>
          <div className="pagination-section">
            <Pagination totalCount={totalCount} />
          </div>
        </>
      )}
    </div>
  );

  return (
    <StoreContext.Provider value={{ searchQuery, list }}>
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
    </StoreContext.Provider>
  );
}
