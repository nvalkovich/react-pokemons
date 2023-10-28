import { Component } from 'react';
import Card from '../Card';
import './CardsList.css'
import { CardData } from '../../types/interfaces';

type CardsListProps = {
  list: CardData[];
}

class CardsList extends Component<CardsListProps> {
  render() {
    return (
      <div className="card-list">
        { this.props.list.map((card) => (<Card key={card.id} data={card}/>)) }
      </div>
    );
  }
}

export default CardsList;
