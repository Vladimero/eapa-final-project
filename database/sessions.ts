// Database query functions: effect only the database

import 'server-only';
import { cache } from 'react';
import { sql } from '../database/connect';
import { Sessions } from '../migrations/00007-createSessions';

// function to delete ALL sessions after expiration date --> call the function inside the createSession function
export const deleteExpiredSessions = cache(async () => {
  await sql`
      DELETE FROM
        sessions
      WHERE
        expiry_timestamp < now()
    `;
});

export const createSession = cache(async (userId: number, token: string) => {
  const [session] = await sql<Sessions[]>`
      INSERT INTO sessions
        (user_id, token)
      VALUES
        (${userId}, ${token})
      RETURNING
        id,
        token,
        user_id
    `;

  await deleteExpiredSessions();

  return session;
});

// Deletes the session token after user logs out
export const deleteSessionByToken = cache(async (token: string) => {
  const [session] = await sql<{ id: number; token: string }[]>`
    DELETE FROM
      sessions
    WHERE
      sessions.token = ${token}
    RETURNING
      id,
      token
  `;
  return session;
});

// Ensure that only a logged-in user can access a page
export const getValidSessionByToken = cache(async (token: string) => {
  const [session] = await sql<{ id: number; token: string }[]>`
    SELECT
      sessions.id,
      sessions.token
    FROM
      sessions
    WHERE
      sessions.token = ${token}
    AND
      sessions.expiry_timestamp > now()
  `;
  return session;
});
