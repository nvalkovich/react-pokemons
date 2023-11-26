import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Details from '@/components/Details';
import userEvent from '@testing-library/user-event';
import { mockCardList } from '@/__mocks__/MockData';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import mockRouter from 'next-router-mock';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

const data = mockCardList[0];

describe('details loader', () => {
  beforeEach(() => {
    mockRouter.push({ query: { details: `${data.id}` } });
    render(
      <RouterContext.Provider value={mockRouter}>
        <Details card={data} />
      </RouterContext.Provider>
    );
  });

  test('the detailed card component correctly displays the detailed card data', async () => {
    expect(screen.getByText(data.name)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText(data.supertype)).toBeInTheDocument();
    expect(screen.getByText(data.subtypes.join(', '))).toBeInTheDocument();
    expect(screen.getByText(data.types.join(', '))).toBeInTheDocument();
    expect(screen.getByText(data.hp)).toBeInTheDocument();
    expect(screen.getByText(data.rarity)).toBeInTheDocument();
    expect(screen.getByAltText(data.name)).toBeInTheDocument();
    expect(screen.getByText(data.flavorText)).toBeInTheDocument();
  });

  test('clicking the close button remove details from search params', async () => {
    expect(mockRouter.query.details).toBe(data.id);
    await userEvent.click(screen.getByTestId('close-btn'));
    expect(mockRouter.query.details).toBe(undefined);
  });
});
