import { CardData, CardsResponse, QueryParams } from './types/interfaces';

const baseURL = 'https://api.pokemontcg.io/v2';
const path = {
  cards: '/cards',
};

const getQueryString = (queryParams: QueryParams[]): string => {
  let string = '';

  if (queryParams.length) {
    string = `?${queryParams
      .map((x): string => `${x.key}=${x.value}`)
      .join('&')}`;
  }

  return string;
};

export const searchCardsByName = async (
  name: string,
  page: number,
  pageSize: number
): Promise<CardsResponse> => {
  const query = getQueryString([
    { key: 'pageSize', value: `${pageSize}` },
    { key: 'page', value: `${page}` },
    { key: 'q', value: `name:${name.trim().replaceAll(' ', '*')}*` },
  ]);
  const url = `${baseURL}${path.cards}${query}`;

  const response = await fetch(url);

  return await response.json();
};

export const getCard = async (id: string): Promise<CardData> => {
  const url = `${baseURL}${path.cards}/${id}`;

  const response = await fetch(url);
  const card = await response.json();

  return card.data;
};
