import { ChangeEvent, KeyboardEvent } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import ErrorButton from './ErrorButton';
import styles from '../styles/SearchInput.module.css';

export default function SearchInput() {
  const router = useRouter();
  const query = (router.query.q as string) || '';
  const validationRegExp = /^[0-9a-zA-Z\s]+$/;

  const [stateValue, setStateValue] = useState(query || '');

  const [validationMessage, setValidationMessage] = useState<string | null>(
    null
  );

  const onSearch = (query: string) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, q: query, page: '1' },
    });
  };

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

  return (
    <div className={styles.main_container}>
      <div className={styles.input_container}>
        <input
          data-testid="search-input"
          type="text"
          value={stateValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className={styles.input}
        />
        {validationMessage && (
          <span className={styles.invalid_message}>{validationMessage}</span>
        )}
      </div>
      <button data-testid="search-button" onClick={handleClick} className="btn">
        Search
      </button>
      <ErrorButton />
    </div>
  );
}
