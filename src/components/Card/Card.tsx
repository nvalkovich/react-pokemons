import { CardData } from '../../types/interfaces';
import './Card.css';

type CardProps = {
  data: CardData;
};

export default function Card({ data }: CardProps) {
  return (
    <div className="card">
      <p className="card__name">{data.name}</p>
      <img
        className="card__image"
        src={data.images.small}
        alt={data.name}
      ></img>
      <ul className="card__details-list card-details">
        <li className="card-details__item">Level: {data.level || 'Unknown'}</li>
        <li className="card-details__item">
          Rarity: {data.rarity || 'Unknown'}
        </li>
      </ul>
    </div>
  );
}
