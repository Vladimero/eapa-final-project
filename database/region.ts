import 'server-only';
import { cache } from 'react';
import { sql } from '../database/connect';
import { Region } from '../migrations/00002-createRegion';

export const getRegion = cache(async () => {
  const selectedRegion = await sql<Region[]>`
    SELECT * FROM region
  `;
  return selectedRegion;
});

export const getRegionById = cache(async (id: number) => {
  const [region] = await sql<Region[]>`
    SELECT
      *
    FROM
      region
    WHERE
      id = ${id}
  `;
  return region;
});
