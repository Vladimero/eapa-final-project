// Database query functions: effect only the database

import 'server-only';
import { cache } from 'react';
import { sql } from '../database/connect';
import { Pollution } from '../migrations/00000-createPollution';

export const getPollution = cache(async () => {
  const selectedPollution = await sql<Pollution[]>`
    SELECT
      *
    FROM
      pollution
  `;
  return selectedPollution;
});

// For displaying the kind of pollution --> History of events
export const getPollutionByKind = cache(async (kind: string) => {
  const [pollutionKind] = await sql<Pollution[]>`
    SELECT
      *
    FROM
      pollution
    WHERE
      kind = ${kind}
  `;
  return pollutionKind;
});
