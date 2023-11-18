import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CardData } from '../types/interfaces';
import { getQueryString } from '../Api';

type cardsByNameArgs = {
  name: string;
  page: number;
  pageSize: number;
};

type cardsResponse = {
  count: number;
  data: CardData[];
  page: number;
  pageSize: number;
  totalCount: number;
};

type cardResponse = {
  count: number;
  data: CardData;
  page: number;
  pageSize: number;
  totalCount: number;
};

export const pokemonCardsApi = createApi({
  reducerPath: 'pokemonCardsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.pokemontcg.io/v2' }),
  endpoints: (builder) => ({
    searchCards: builder.query<cardsResponse, cardsByNameArgs>({
      query: ({ pageSize, page, name }) => {
        const query = getQueryString([
          { key: 'pageSize', value: `${pageSize}` },
          { key: 'page', value: `${page}` },
          { key: 'q', value: `name:${name.trim().replaceAll(' ', '*')}*` },
        ]);
        return `cards/${query}`;
      },
    }),
    getCardById: builder.query<cardResponse, string>({
      query: (id) => `cards/${id}`,
    }),
  }),
});

export const { useSearchCardsQuery, useGetCardByIdQuery } = pokemonCardsApi;
