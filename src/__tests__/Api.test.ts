import { getQueryString } from '../Api';
import { fakeQueryParams as queryParams } from '../__mocks__/FakeData';

describe('Api', () => {
  test('get query string', async () => {
    expect(getQueryString(queryParams)).toBe('?pageSize=4&page=1&q=pok');
  });
});
