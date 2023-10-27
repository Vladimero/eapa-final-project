import { cache } from 'react';
import { Events } from '../migrations/00008-createEvents';
import { sql } from './connect';

export const createEvent = cache(
  async (
    userId: number,
    pollutionId: number,
    regionId: number,
    report: string,
    date: string,
    adminComment: string,
  ) => {
    const [event] = await sql<Events[]>`
      INSERT INTO events
        (user_id, pollution_id, region_id, report, date, admin_comment)
      VALUES
        (${userId},${pollutionId},${regionId},${report},${date},${adminComment})
      RETURNING *
    `;

    return event;
  },
);
