import { QueryParams } from './types/interfaces';

export const getQueryString = (queryParams: QueryParams[]): string => {
  let string = '';

  if (queryParams.length) {
    string = `?${queryParams
      .map((x): string => `${x.key}=${x.value}`)
      .join('&')}`;
  }

  return string;
};
