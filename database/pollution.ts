// Database query functions: effect only the database

import 'server-only';
import { cache } from 'react';
import { sql } from '../database/connect';
import { Pollution } from '../migrations/00000-createPollution';

export const getPollution = cache(async () => {
  const selectedPollution = await sql<Pollution[]>`
    SELECT * FROM pollution
  `;
  return selectedPollution;
});

// For dynamic rendering
export const getPollutionById = cache(async (id: number) => {
  const [pollution] = await sql<Pollution[]>`
    SELECT
      *
    FROM
      pollution
    WHERE
      id = ${id}
  `;
  return pollution;
});
