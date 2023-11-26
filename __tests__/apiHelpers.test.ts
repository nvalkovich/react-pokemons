import { getQuery } from '@/services/apiHelpers';
import { mockQueryParams as queryParams } from '@/__mocks__/MockData';

describe('api-helpers', () => {
  test('get url query', async () => {
    expect(getQuery(queryParams)).toBe('?pageSize=4&page=1&q=pok');
  });
});
