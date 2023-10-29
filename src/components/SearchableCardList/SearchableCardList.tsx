import { Component } from 'react';
import SearchInput from '../SearchInput';
import CardList from '../CardList';
import { CardData } from '../../types/interfaces';
import Api from '../../Api';
import Loader from '../Loader';
import './SearchableCardList.css';

type SearchableCardListState = {
  searchQuery: string;
  isFetching: boolean;
  list: CardData[];
};

const searchQueryKey = 'searchQuery';

class SearchableCardList extends Component<object, SearchableCardListState> {
  private api: Api;

  constructor(props: object) {
    super(props);
    const searchQuery = localStorage.getItem(searchQueryKey);
    this.state = {
      searchQuery: searchQuery ?? '',
      isFetching: false,
      list: [],
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.api = new Api();
  }

  async componentDidMount() {
    await this.handleSearch(this.state.searchQuery);
  }

  async handleSearch(searchQuery: string) {
    localStorage.setItem(searchQueryKey, searchQuery);
    this.setState({ isFetching: true });

    try {
      const data = await this.api.searchCardsByName(searchQuery);
      this.setState({ list: data, searchQuery });
    } finally {
      this.setState({ isFetching: false });
    }
  }

  render() {
    return (
      <>
        <div className="search-section">
          <h1 className="title">Pokémon cards</h1>
          <SearchInput
            value={this.state.searchQuery}
            onSearch={this.handleSearch}
          />
        </div>
        <div className="cards-section">
          {this.state.isFetching ? (
            <Loader />
          ) : (
            <CardList list={this.state.list} />
          )}
        </div>
      </>
    );
  }
}

export default SearchableCardList;
