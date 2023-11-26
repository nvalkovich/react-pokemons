import 'whatwg-fetch';
import Home, { HomePageProps, getServerSideProps } from '@/pages';
import '@testing-library/jest-dom';
import { ParsedUrlQuery } from 'querystring';
import { GetServerSidePropsContext } from 'next';
import { screen, waitFor } from '@testing-library/react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import mockRouter from 'next-router-mock';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { mockCardList } from '@/__mocks__/MockData';

const cardData = mockCardList[0];

describe('HomePage', () => {
  const page = '1';
  const pageSize = '4';
  const details = cardData.id;

  it('renders correctly without detailedCardData', async () => {
    const context = {
      query: { page, pageSize } as ParsedUrlQuery,
    };

    const { props } = (await getServerSideProps(
      context as GetServerSidePropsContext
    )) as { props: HomePageProps };

    render(
      <RouterContext.Provider value={mockRouter}>
        <Home {...props} />
      </RouterContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('main-section')).toBeInTheDocument();
      expect(screen.queryByTestId('shaded-wrapper')).toBeNull();
      expect(screen.queryByTestId('shaded-wrapper')).toBeNull();
    });
  });

  it('renders correctly with detailedCardData', async () => {
    const context = {
      query: { page, pageSize, details } as ParsedUrlQuery,
    };

    const { props } = (await getServerSideProps(
      context as GetServerSidePropsContext
    )) as { props: HomePageProps };

    render(
      <RouterContext.Provider value={mockRouter}>
        <Home {...props} />
      </RouterContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('main-section')).toBeInTheDocument();
      expect(screen.getByTestId('shaded-wrapper')).toBeInTheDocument();
      expect(screen.getByTestId('shaded-wrapper')).toBeInTheDocument();
    });
  });
});
