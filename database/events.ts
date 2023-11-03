import { cache } from 'react';
import { Events } from '../migrations/00008-createEvents';
import { sql } from './connect';
import { UserEvent } from './users';

export const createEvent = cache(
  async (
    userId: number,
    pollutionId: number,
    regionId: number,
    report: string,
    damageEstimation: string,
    date: string,
    secureUrl: string,
    adminComment: string,
  ) => {
    const [event] = await sql<Events[]>`
      INSERT INTO events
        (user_id, pollution_id, region_id, report, damage_estimation, date, secure_url, admin_comment)
      VALUES
        (${userId},${pollutionId},${regionId},${report},${damageEstimation},${date},${secureUrl},${adminComment})
      RETURNING *
    `;

    return event;
  },
);

export const getAllEvents = cache(async () => {
  const [events] = await sql<UserEvent[]>`
    SELECT
      events.id AS event_id,
      events.pollution_id AS pollution_id,
      events.region_id AS region_id,
      events.report AS report,
      events.damage_estimation AS damage_estimation,
      events.date AS date,
      events.secure_url AS secure_url,
      events.admin_comment AS admin_comment,
      users.first_name AS first_name
    FROM
      events
    INNER JOIN
      users ON events.user_id = users.id
    INNER JOIN
      pollution ON events.pollution_id = pollution.id
    INNER JOIN
      region ON events.region_id = region.id
  `;
  return events;
});

export const getEventById = cache(async (id: number) => {
  const [events] = await sql<UserEvent[]>`
    SELECT
      events.id AS event_id,
      events.pollution_id AS pollution_id,
      events.region_id AS region_id,
      events.report AS report,
      events.damage_estimation AS damage_estimation,
      events.date AS date,
      events.secure_url AS secure_url,
      events.admin_comment AS admin_comment,
      users.first_name AS first_name
    FROM
      events
    INNER JOIN
      users ON posts.user_id = users.id
    WHERE
      events.id = ${id}
  `;
  return events;
});
