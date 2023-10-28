import { Component } from 'react';
import Card from '../Card';
import './CardsList.css'

class CardsList extends Component {
  render() {
    return (
      <div className="card-list">
        <Card />
      </div>
    );
  }
}

export default CardsList;
