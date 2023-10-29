import { Component } from 'react';
import SearchInput from '../SearchInput';
import CardList from '../CardList';
import { CardData } from '../../types/interfaces';
import Api from '../../Api';
import Loader from '../Loader';

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
        <SearchInput
          value={this.state.searchQuery}
          onSearch={this.handleSearch}
        />
        {this.state.isFetching ? (
          <Loader />
        ) : (
          <CardList list={this.state.list} />
        )}
      </>
    );
  }
}

export default SearchableCardList;
