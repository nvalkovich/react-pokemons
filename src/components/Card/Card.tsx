import { Link, useSearchParams } from 'react-router-dom';
import { CardData } from '../../types/interfaces';
import './Card.css';

type CardProps = {
  data: CardData;
};

export default function Card({ data }: CardProps) {
  const [searchParams] = useSearchParams();
  searchParams.set('id', data.id);

  return (
    <Link
      data-testid="card"
      to={{ pathname: 'details', search: searchParams.toString() }}
    >
      <div className="card">
        <p className="card__name">{data.name}</p>
        <img
          className="card__image"
          src={data.images?.small}
          alt={data.name}
        ></img>
        <ul className="card__details-list card-details-list">
          <li className="card-details-list__item">
            Level: {data.level || 'Unknown'}
          </li>
          <li className="card-details-list__item">
            Rarity: {data.rarity || 'Unknown'}
          </li>
        </ul>
      </div>
    </Link>
  );
}
