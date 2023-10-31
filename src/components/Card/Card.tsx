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
        <p className="card__name">{this.props.data.name}</p>
        <img
          className="card__image"
          src={this.props.data.images.small}
          alt={this.props.data.name}
        ></img>
        <ul className="card__details-list card-details">
          <li className="card-details__item">
            Level: {this.props.data.level || 'Unknown'}
          </li>
          <li className="card-details__item">
            Rarity: {this.props.data.rarity || 'Unknown'}
          </li>
        </ul>
      </div>
    );
  }
}

export default Card;
