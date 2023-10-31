import { CardData, QueryParams } from './types/interfaces';

class Api {
  private baseURL: string;

  private path: { [key: string]: string };

  private pageSize: number;

  constructor() {
    this.baseURL = 'https://api.pokemontcg.io/v2';
    this.path = {
      cards: '/cards',
    };
    this.pageSize = 12;
  }

  public getQueryString(queryParams: QueryParams[]): string {
    let string = '';

    if (queryParams.length) {
      string = `?${queryParams
        .map((x): string => `${x.key}=${x.value}`)
        .join('&')}`;
    }

    return string;
  }

  public async searchCardsByName(
    name: string,
    page: number = 1
  ): Promise<CardData[]> {
    const query = this.getQueryString([
      { key: 'pageSize', value: `${this.pageSize}` },
      { key: 'page', value: `${page}` },
      { key: 'q', value: `name:${name.trim().replaceAll(' ', '*')}*` },
    ]);
    const url = `${this.baseURL}${this.path.cards}${query}`;

    const response = await fetch(url);
    const cards = await response.json();

    return cards.data;
  }
}

export default Api;
