import { ChangeEvent, Component } from 'react';
import './SearchInput.css';

type SearchProps = {
  onSearch: (query: string) => void;
};

type SearchState = {
  value: string,
};

const searchQueryKey = 'searchQuery';

class SearchInput extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    const query = localStorage.getItem(searchQueryKey);
    this.state = { value: query ?? '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({ value: event.target.value });
  }

  handleClick() {
    localStorage.setItem(searchQueryKey, this.state.value);
    this.props.onSearch(this.state.value);
  }

  render() {
    return (
      <div className='search-container'>
        <input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
          className="input"
        />
        <button onClick={this.handleClick} className="btn">Search</button>
      </div>
    );
  }
}

export default SearchInput;
