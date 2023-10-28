import { Component } from 'react';
import SearchInput from './components/SearchInput';
import CardsList from './components/CardsList';
import './App.css';

class App extends Component {
  constructor(props: object) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(searchQuery: string) {
    console.log(searchQuery);
  }

  render() {
    return (
      <div className='app-container'>
        <SearchInput onSearch={this.handleSearch}/>
        <CardsList />
      </div>
    );
  }
}

export default App;
