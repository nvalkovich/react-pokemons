import { QueryParams } from '../types/interfaces';

export const getQuery = (queryParams: QueryParams[]): string => {
  let query = '';

  if (queryParams.length) {
    query = `?${queryParams
      .map((param): string => `${param.key}=${param.value}`)
      .join('&')}`;
  }

  return query;
};
