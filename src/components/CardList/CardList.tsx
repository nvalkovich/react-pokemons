import Card from '../Card';
import './CardList.css';
import { CardData } from '../../types/interfaces';

type CardListProps = {
  list: CardData[] | [];
};

export default function CardList({ list }: CardListProps) {
  return list && list.length ? (
    <div className="card-list" data-testid="card-list">
      {list.map((card) => {
        return <Card key={card.id} data={card} />;
      })}
    </div>
  ) : (
    <p>No cards were found for this request</p>
  );
}
