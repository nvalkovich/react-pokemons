import { Link, useSearchParams } from 'react-router-dom';
import { CardData } from '../../types/interfaces';
import Card from '../Card';
import './CardList.css';

type CardListProps = {
  list: CardData[];
};

export default function CardList({ list }: CardListProps) {
  const [searchParams] = useSearchParams();

  return list.length ? (
    <div className="card-list">
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
