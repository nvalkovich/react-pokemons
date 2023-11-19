import { ChangeEvent } from 'react';
import './Pagination.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setItemsPerPage, setPage } from '../../store/paginationSlice';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function Pagination() {
  const dispatch = useAppDispatch();

  const changePageSize = (query: string) => dispatch(setItemsPerPage(query));
  const changePage = (query: string) => dispatch(setPage(query));

  const page = useAppSelector((state) => state.pagination.page);
  const itemsPerPage = useAppSelector((state) => state.pagination.itemsPerPage);
  const totalCount = useAppSelector((state) => state.pagination.totalCount);

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const setPageToQueryParams = () => {
    searchParams.set('page', page.toString());
    navigate({ search: searchParams.toString() });
  };

  const onPageSizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    changePageSize(event.target?.value);
    changePage('1');
    setPageToQueryParams();
  };

  const handlePrevClick = () => {
    changePage((+page - 1).toString());
    setPageToQueryParams();
  };

  const handleNextClick = () => {
    changePage((+page + 1).toString());
    setPageToQueryParams();
  };

  return (
    <>
      <div className="page-size-select">
        <p>Cards per page:</p>
        <select value={itemsPerPage} onChange={onPageSizeChange}>
          <option value={4}>4</option>
          <option value={8}>8</option>
          <option value={12}>12</option>
          <option value={16}>16</option>
          <option value={20}>20</option>
        </select>
      </div>
      <div className="pagination-btns">
        <button
          data-testid="button-prev-page"
          className="arrow"
          disabled={page <= 1}
          onClick={handlePrevClick}
        >
          &lt;
        </button>
        <div className="page-num">{page}</div>
        <button
          data-testid="button-next-page"
          className="arrow"
          disabled={page >= Math.ceil(totalCount / itemsPerPage)}
          onClick={handleNextClick}
        >
          &gt;
        </button>
      </div>
    </>
  );
}
