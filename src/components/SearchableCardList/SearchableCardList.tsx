import { useEffect } from 'react';
import SearchInput from '../SearchInput';
import CardList from '../CardList';
import Loader from '../Loader';
import './SearchableCardList.css';
import Pagination from '../Pagination';
import {
  Outlet,
  useNavigate,
  useLocation,
  useSearchParams,
} from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { useSearchCardsQuery } from '../../services/pokemonCardsApi';

export default function SearchableCardList() {
  const searchQuery = useAppSelector((state) => state.search.searchQuery);
  const itemsPerPage = useAppSelector((state) => state.pagination.itemsPerPage);

  const currentPage = useAppSelector((state) => state.pagination.page);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    searchParams.set('page', currentPage.toString());
    setSearchParams(searchParams);
  }, [currentPage, searchParams, setSearchParams]);

  const navigate = useNavigate();

  const location = useLocation();
  const isShaded = location.pathname === '/details';

  const onWrapperClick = () => {
    searchParams.delete('id');
    navigate({ pathname: '/', search: searchParams.toString() });
  };

  const { data: response, isFetching } = useSearchCardsQuery({
    pageSize: itemsPerPage,
    page: currentPage,
    name: searchQuery,
  });

  const list = response?.data || [];
  const totalCount = Number(response?.totalCount);

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
            <CardList list={list} />
          </div>
          <div className="pagination-section">
            <Pagination totalCount={totalCount} />
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
