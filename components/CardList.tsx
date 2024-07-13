import Card from './Card';
import { CardData } from '../types/interfaces';
import styles from '../styles/CardList.module.css';

type CardListProps = {
  list: CardData[] | [];
};

export default function CardList({ list }: CardListProps) {
  return list && list.length ? (
    <div className={styles.card_list} data-testid="card-list">
      {list.map((card) => {
        return <Card key={card.id} data={card} />;
      })}
    </div>
  ) : (
    <p>No cards were found for this request</p>
  );
}
