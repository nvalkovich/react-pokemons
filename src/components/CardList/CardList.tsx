import Card from '../Card';
import './CardList.css';
import { StoreContext } from '../../storeContext';
import { useContext } from 'react';

export default function CardList() {
  const { list } = useContext(StoreContext);
  return list.length ? (
    <div className="card-list" data-testid="card-list">
      {list.map((card) => {
        return <Card key={card.id} data={card} />;
      })}
    </div>
  ) : (
    <p>No cards were found for this request</p>
  );
}
