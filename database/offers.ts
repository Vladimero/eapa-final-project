import 'server-only';
import { cache } from 'react';
import { sql } from '../database/connect';
import { Offers } from '../migrations/00004-createOffers';

export const getOffers = cache(async () => {
  const selectedOffers = await sql<Offers[]>`
    SELECT * FROM offers
  `;
  return selectedOffers;
});

export const getOffersById = cache(async (id: number) => {
  const [offer] = await sql<Offers[]>`
    SELECT
      *
    FROM
      offers
    WHERE
      id = ${id}
  `;
  return offer;
});
