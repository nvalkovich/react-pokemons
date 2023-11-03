import { ChangeEvent } from 'react';
import { useState } from 'react';
import './SearchInput.css';
import ErrorButton from '../ErrorButton';

type SearchProps = {
  value: string;
  onSearch: (query: string) => void;
};

export default function SearchInput({ value, onSearch }: SearchProps) {
  const validationRegExp = /^[0-9a-zA-Z\s]+$/;

  const [stateValue, setStateValue] = useState(value);
  const [validationMessage, setValidationMessage] = useState<string | null>(
    null
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStateValue(event.target.value);
    setValidationMessage(null);
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

  return (
    <div className="search-container">
      <div className="input-container">
        <input
          type="text"
          value={stateValue}
          onChange={handleChange}
          className="input"
        />
        {validationMessage && (
          <span className="input-message">{validationMessage}</span>
        )}
      </div>
      <button onClick={handleClick} className="btn">
        Search
      </button>
      <ErrorButton />
    </div>
  );
}
