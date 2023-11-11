import { Link, useSearchParams } from 'react-router-dom';
import Card from '../Card';
import './CardList.css';
import { StoreContext } from '../../storeContext';
import { useContext } from 'react';

export default function CardList() {
  const { list } = useContext(StoreContext);
  const [searchParams] = useSearchParams();

  return list.length ? (
    <div className="card-list" data-testid="card-list">
      {list.map((card) => {
        searchParams.set('id', card.id);
        return (
          <Link
            key={card.id}
            to={{ pathname: 'details', search: searchParams.toString() }}
          >
            <Card data={card} />
          </Link>
        );
      })}
    </div>
  ) : (
    <p>No cards were found for this request</p>
  );
}
