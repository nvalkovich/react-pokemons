import { CardData } from '@/types/interfaces';

interface Response {
  count: number;
  page: number;
  pageSize: number;
  totalCount: number;
}

export interface CardListResponse extends Response {
  data: CardData[];
}

export interface CardResponse extends Response {
  data: CardData;
}
