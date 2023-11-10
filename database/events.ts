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
  adminComment: string | null;
  latitude: number;
  longitude: number;
  firstName: string;
};

export type AdminEventViewOnAllEventsFromOneUser = {
  eventId: number;
  userId: number;
  pollutionId: number;
  regionId: number;
  report: string;
  damageEstimation: string;
  date: string;
  secureUrl: string;
  adminComment: string | null;
  latitude: number;
  longitude: number;
  firstName: string;
};

export type UpdateAdminComment = {
  eventId: number;
  adminComment: string;
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
    adminComment: string | null,
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

// Current logged-in user sees all his events
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
  const allEventsForAdmin = await sql<Events[]>`
    SELECT * FROM events
  `;
  return allEventsForAdmin;
});

// Update admin comment
export const updateAdminComment = cache(
  async (eventId: number, adminComment: string) => {
    const [updatedEvent] = await sql<UpdateAdminComment[]>`
    UPDATE
      events
    SET
      admin_comment = ${adminComment}
    WHERE
      id = ${eventId}
    RETURNING *
  `;
    return updatedEvent;
  },
);

// Admin sees all events from only one user
export const getAllEventsFromOneUserForAdminByUserId = cache(
  async (userId: number) => {
    const allEventsForAdminFromOneUser = await sql<AdminEventViewOnAllEventsFromOneUser[]>`
  SELECT
    events.id AS event_id,
    events.user_id AS userId,
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
  WHERE
    events.user_id = ${userId}
  `;
    return allEventsForAdminFromOneUser;
  },
);
