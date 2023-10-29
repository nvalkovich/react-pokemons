import { ChangeEvent, Component } from 'react';
import './SearchInput.css';
import ErrorButton from '../ErrorButton';

type SearchProps = {
  value: string;
  onSearch: (query: string) => void;
};

type SearchState = {
  value: string;
};

class SearchInput extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = { value: props.value };
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: event.target.value });
  }

  handleClick = () => {
    this.props.onSearch(this.state.value);
  }

  render() {
    return (
      <div className="search-container">
        <input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
          className="input"
        />
        <button onClick={this.handleClick} className="btn btn-search">
          Search
        </button>
        <ErrorButton />
      </div>
    );
  }
}

export default SearchInput;
