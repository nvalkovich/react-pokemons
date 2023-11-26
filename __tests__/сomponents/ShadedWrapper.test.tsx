import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockCardList } from '@/__mocks__/MockData';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import mockRouter from 'next-router-mock';
import ShadedWrapper from '@/components/ShadedWrapper';
import SearchableCardList from '@/components/SearchableCardList';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

const data = mockCardList[0];

describe('Details loader', () => {
  beforeEach(() => {
    mockRouter.push({ query: { details: `${data.id}` } });
    render(
      <RouterContext.Provider value={mockRouter}>
        <ShadedWrapper>
          <SearchableCardList list={[]} totalCount={0} />
        </ShadedWrapper>
      </RouterContext.Provider>
    );
  });

  test('clicking the shaded wrapper remove details from search params', async () => {
    expect(mockRouter.query.details).toBe(data.id);
    await userEvent.click(screen.getByTestId('shaded-wrapper'));
    expect(mockRouter.query.details).toBe(undefined);
  });
});
