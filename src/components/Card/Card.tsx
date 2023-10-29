import { Component } from 'react';
import { CardData } from '../../types/interfaces';
import './Card.css';

type CardProps = {
  data: CardData;
};

class Card extends Component<CardProps> {
  render() {
    return (
      <div className="card">
        <p>{this.props.data.name}</p>
        <img
          className="card__name"
          src={this.props.data.images.small}
          alt={this.props.data.name}
        ></img>
      </div>
    );
  }
}

export default Card;
