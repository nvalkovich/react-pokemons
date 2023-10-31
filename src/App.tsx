import { Component } from 'react';
import './App.css';
import SearchableCardList from './components/SearchableCardList';
import ErrorBoundary from './components/ErrorBoundary';

class App extends Component {
  render() {
    return (
      <div className="app-container">
        <ErrorBoundary>
          <SearchableCardList />
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
