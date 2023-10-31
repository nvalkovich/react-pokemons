import { Component } from 'react';
import { CardData } from '../../types/interfaces';
import Card from '../Card';
import './CardList.css';

type CardListProps = {
  list: CardData[];
};

class CardList extends Component<CardListProps> {
  render() {
    return this.props.list.length ? (
      <div className="card-list">
        {this.props.list.map((card) => (
          <Card key={card.id} data={card} />
        ))}
      </div>
    ) : (
      <p>No cards were found for this request</p>
    );
  }
}

export default CardList;
