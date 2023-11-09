import { cache } from 'react';
import { Events } from '../migrations/00008-createEvents';
import { sql } from './connect';

export type UserEvent = {
  eventId: number;
  pollutionId: number;
  regionId: number;
  report: string;
  damageEstimation: string;
  date: string;
  secureUrl: string;
  adminComment: string;
  latitude: number;
  longitude: number;
  firstName: string;
};

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
    latitude: number,
    longitude: number,
  ) => {
    const [event] = await sql<Events[]>`
      INSERT INTO events
        (user_id, pollution_id, region_id, report, damage_estimation, date, secure_url, admin_comment, latitude, longitude)
      VALUES
        (${userId},${pollutionId},${regionId},${report},${damageEstimation},${date},${secureUrl},${adminComment},${latitude},${longitude})
      RETURNING *
    `;

    return event;
  },
);

// Display only the events from the logged-in user
export const getAllEventsFromUserBySessionToken = cache(
  async (token: string) => {
    const events = await sql<UserEvent[]>`
      SELECT
        events.id AS event_id,
        events.pollution_id AS pollution_id,
        events.region_id AS region_id,
        events.report AS report,
        events.damage_estimation AS damage_estimation,
        events.date AS date,
        events.secure_url AS secure_url,
        events.admin_comment AS admin_comment,
        events.latitude AS latitude,
        events.longitude AS longitude,
        users.first_name AS first_name
      FROM
        events
      INNER JOIN
        users ON events.user_id = users.id
      INNER JOIN
        pollution ON events.pollution_id = pollution.id
      INNER JOIN
        region ON events.region_id = region.id
      INNER JOIN
        sessions ON (
          sessions.token = ${token} AND
          sessions.user_id = users.id AND
          sessions.expiry_timestamp > now()
        )
  `;
    return events;
  },
);

// Admin sees all created events from all users
export const getAllEventsForAdmin = cache(async () => {
  const eventsForAdmin = await sql<Events[]>`
    SELECT * FROM events
  `;
  return eventsForAdmin;
});

// Admin should see all events from only one user after selection
export const getAllEventsFromOneUserForAdmin = cache(async () => {
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
      events.latitude AS latitude,
      events.longitude AS longitude,
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

// For dynamic rendering, after clicking on one event (dynamic page)
export const getEventFromOneUserById = cache(async (id: number) => {
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
      events.latitude AS latitude,
      events.longitude AS longitude,
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
