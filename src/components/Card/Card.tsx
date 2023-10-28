import { Component } from 'react';
import { CardData } from '../../types/interfaces';
import './Card.css';

type CardProps = {
  data: CardData;
}

class Card extends Component<CardProps> {
  render() {
    return <div className="card">
      <p className='card__name'>
      {this.props.data.name}
      </p>
    </div>;
  }
}

export default Card;
