// Database query functions: effect only the database

import 'server-only';
import { cache } from 'react';
import { sql } from '../database/connect';
import { Region } from '../migrations/00002-createRegion';

export const getRegion = cache(async () => {
  const selectedRegion = await sql<Region[]>`
    SELECT
      *
    FROM
      region
  `;
  return selectedRegion;
});

// For displaying the states of region --> History of events
export const getRegionByState = cache(async (stateOfAustria: string) => {
  const [regionState] = await sql<Region[]>`
    SELECT
      *
    FROM
      region
    WHERE
      state_of_austria = ${stateOfAustria}
  `;
  return regionState;
});
