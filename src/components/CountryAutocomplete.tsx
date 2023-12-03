import React, { ForwardedRef } from 'react';
import { ChangeEvent, useState } from 'react';
import { getFilteredCountries } from '../utils/helpers';
import './CountryAutocomplete.css';
import { ChangeHandler } from 'react-hook-form';
import { useAppSelector } from '../store/hooks';

type AutocompleteProps = {
  onChange?: ChangeHandler | undefined;
  name: string;
};

export const CountryAutocomplete = React.forwardRef<
  HTMLInputElement,
  AutocompleteProps
>(
  (
    { onChange, name }: AutocompleteProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const [searchValue, setSearchValue] = useState<string>('');
    const [isOpen, setOpenState] = useState(true);
    const countries = useAppSelector((state) => state.countries.countries);

    const onChangeInput = (value: ChangeEvent<HTMLInputElement>) => {
      setSearchValue(value.target.value);
      if (value.target.value !== searchValue) {
        setOpenState(true);
      }
    };

    const onBlurInput = () => {
      setTimeout(() => setOpenState(false), 250);
    };

    const onItemClick = (value: string) => {
      setSearchValue(value);
      setOpenState(false);
      onChange?.({
        target: {
          name,
          value,
        },
      });
    };

    const filteredCountries = getFilteredCountries(countries, searchValue);

    return (
      <div className="country-input-container">
        <label htmlFor="country">Country</label>
        <input
          id="country"
          onChange={onChangeInput}
          onBlur={onBlurInput}
          value={searchValue}
          ref={ref}
          name={name}
          autoComplete="off"
        />

        <ul className="autocomplete">
          {isOpen &&
            filteredCountries.map((dataItem) => {
              return (
                <li
                  key={dataItem}
                  className="autocomplete__item"
                  onClick={() => onItemClick(dataItem)}
                >
                  {dataItem}
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
);
