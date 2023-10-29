import { Component } from 'react';
import './App.css';
import SearchableCardList from './components/SearchableCardList';

class App extends Component {
  render() {
    return (
      <div className="app-container">
        <SearchableCardList />
      </div>
    );
  }
}

export default App;
