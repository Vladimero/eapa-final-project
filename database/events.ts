import { cache } from 'react';
import { Events } from '../migrations/00008-createEvents';
import { sql } from './connect';

export const createEvent = cache(
  async (
    userId: number,
    report: string,
    damageEstimation: string,
    date: string,
    adminComment: string,
  ) => {
    const [event] = await sql<Events[]>`
      INSERT INTO events
        (user_id, report, damage_estimation, date, admin_comment)
      VALUES
        (${userId},${report},${damageEstimation},${date},${adminComment})
      RETURNING *
    `;

    return event;
  },
);
