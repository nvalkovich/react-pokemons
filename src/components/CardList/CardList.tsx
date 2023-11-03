import { CardData } from '../../types/interfaces';
import Card from '../Card';
import './CardList.css';

type CardListProps = {
  list: CardData[];
};

export default function CardList({ list }: CardListProps) {
  return list.length ? (
    <div className="card-list">
      {list.map((card) => (
        <Card key={card.id} data={card} />
      ))}
    </div>
  ) : (
    <p>No cards were found for this request</p>
  );
}
