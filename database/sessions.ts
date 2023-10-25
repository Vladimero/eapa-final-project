import 'server-only';
import { cache } from 'react';
import { sql } from '../database/connect';
import { Sessions } from '../migrations/00007-createSessions';

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

  return session;
});
