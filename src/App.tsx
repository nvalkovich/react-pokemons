import { Component } from 'react';
import './App.css';
import SearchSection from './components/SearchSection';

class App extends Component {
  render() {
    return (
      <div className='app-container'>
        <SearchSection />
      </div>
    );
  }
}

export default App;
