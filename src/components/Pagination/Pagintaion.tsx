import { ChangeEvent } from 'react';
import './Pagination.css';

type PaginationProps = {
  page: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
};

export default function Pagination({
  page,
  pageSize,
  totalCount,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  const onPageSizeChangeInternal = (event: ChangeEvent<HTMLSelectElement>) => {
    onPageSizeChange(+event.target?.value);
  };

  const handlePrevClick = () => {
    onPageChange(page - 1);
  };

  const handleNextClick = () => {
    onPageChange(page + 1);
  };

  return (
    <>
      <div className="page-size-select">
        <p>Cards per page:</p>
        <select value={pageSize} onChange={onPageSizeChangeInternal}>
          <option value={4}>4</option>
          <option value={8}>8</option>
          <option value={12}>12</option>
          <option value={16}>16</option>
          <option value={20}>20</option>
        </select>
      </div>
      <div className="pagination-btns">
        <button
          className="arrow"
          disabled={page <= 1}
          onClick={handlePrevClick}
        >
          &lt;
        </button>
        <div className="page-num">{page}</div>
        <button
          className="arrow"
          disabled={page >= Math.ceil(totalCount / pageSize)}
          onClick={handleNextClick}
        >
          &gt;
        </button>
      </div>
    </>
  );
}
