import { ChangeEvent, KeyboardEvent, useEffect } from 'react';
import { useState } from 'react';
import './SearchInput.css';
import ErrorButton from '../ErrorButton';
import { useAppSelector } from '../../store/hooks';
import { search } from '../../store/searchSlice';
import { useAppDispatch } from '../../store/hooks';
import { setPage } from '../../store/paginationSlice';

const searchQueryKey = 'searchQuery';

export default function SearchInput() {
  const dispatch = useAppDispatch();

  const onSearch = (query: string) => {
    dispatch(setPage('1'));
    dispatch(search(query));
    localStorage.setItem(searchQueryKey, query);
  };

  const searchQuery = localStorage.getItem(searchQueryKey);

  const validationRegExp = /^[0-9a-zA-Z\s]+$/;

  const [stateValue, setStateValue] = useState(searchQuery || '');

  const [validationMessage, setValidationMessage] = useState<string | null>(
    null
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStateValue(event.target.value);
    setValidationMessage(null);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch(stateValue);
    }
  };

  const handleClick = () => {
    if (!stateValue.match(validationRegExp) && stateValue) {
      setValidationMessage(
        'Invalid search request. Please, use Latin characters'
      );
      return;
    }

    onSearch(stateValue);
  };

  const query = useAppSelector((state) => state.search.searchQuery);

  useEffect(() => {
    if (query && query.length) {
      setStateValue(query);
      onSearch(query);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div className="search-container">
      <div className="input-container">
        <input
          data-testid="search-input"
          type="text"
          value={stateValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="input"
        />
        {validationMessage && (
          <span className="input-message">{validationMessage}</span>
        )}
      </div>
      <button data-testid="search-button" onClick={handleClick} className="btn">
        Search
      </button>
      <ErrorButton />
    </div>
  );
}
