import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getQuery } from './apiHelpers';
import { HYDRATE } from 'next-redux-wrapper';
import { CardResponse, CardListResponse } from './responseTypes';

type cardsByNameArgs = {
  q: string;
  page: string;
  pageSize: string;
};

export const pokemonCardsApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.pokemontcg.io/v2' }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: [],
  endpoints: (builder) => ({
    searchCards: builder.query<CardListResponse, cardsByNameArgs>({
      query: ({ pageSize, page, q }) => {
        const query = getQuery([
          { key: 'pageSize', value: `${pageSize}` },
          { key: 'page', value: `${page}` },
          { key: 'q', value: `name:${q.trim().replaceAll(' ', '*')}*` },
        ]);
        return `cards/${query}`;
      },
    }),
    getCardById: builder.query<CardResponse, string>({
      query: (id) => `cards/${id}`,
    }),
  }),
});

export const {
  useSearchCardsQuery,
  useGetCardByIdQuery,
  util: { getRunningQueriesThunk },
} = pokemonCardsApi;

export const { searchCards, getCardById } = pokemonCardsApi.endpoints;
