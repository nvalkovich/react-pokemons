import { useRouter } from 'next/router';
import styles from '../styles/Pagination.module.css';
import { ChangeEvent } from 'react';

type PaginationProps = {
  totalCount: number;
};

export default function Pagination({ totalCount }: PaginationProps) {
  const router = useRouter();
  const page = Number(router.query.page) || 1;
  const pageSize = Number(router.query.pageSize) || 12;

  const onPageSizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, pageSize: event.target?.value, page: '1' },
    });
  };

  const handlePrevClick = () => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: page - 1 },
    });
  };

  const handleNextClick = () => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: page + 1 },
    });
  };

  return (
    <>
      <div className={styles.page_size_select}>
        <p>Cards per page:</p>
        <select value={pageSize} onChange={onPageSizeChange}>
          <option value={4}>4</option>
          <option value={8}>8</option>
          <option value={12}>12</option>
          <option value={16}>16</option>
          <option value={20}>20</option>
        </select>
      </div>
      <div className={styles.page_btns}>
        <button
          data-testid="button-prev-page"
          className={styles.arrow}
          disabled={page <= 1}
          onClick={handlePrevClick}
        >
          &lt;
        </button>
        <div className="page-num">{page}</div>
        <button
          data-testid="button-next-page"
          className={styles.arrow}
          disabled={page >= Math.ceil(totalCount / pageSize)}
          onClick={handleNextClick}
        >
          &gt;
        </button>
      </div>
    </>
  );
}
