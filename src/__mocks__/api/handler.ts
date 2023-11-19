import { rest } from 'msw';
import { mockCardList } from '../FakeData';

export const handlers = [
  rest.get('https://api.pokemontcg.io/v2', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockCardList), ctx.delay(30));
  }),
];
