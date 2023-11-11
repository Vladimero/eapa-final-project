import { cache } from 'react';
import { Events } from '../migrations/00008-createEvents';
import { sql } from './connect';

export type UserEvent = {
  eventId: number;
  pollutionKind: string;
  regionState: string;
  report: string;
  damageEstimation: string;
  date: string;
  secureUrl: string;
  adminComment: string | null;
  latitude: number;
  longitude: number;
  firstName: string;
};

export type EventsForAdmin = {
  id: number;
  userId: number;
  pollutionKind: string;
  regionState: string;
  report: string;
  damageEstimation: string;
  date: string;
  secureUrl: string;
  adminComment: string | null;
  latitude: number;
  longitude: number;
  firstName: string;
};

export type ViewAllEventsFromOneUser = {
  eventId: number;
  userId: number;
  pollutionKind: string;
  regionState: string;
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
    pollutionKind: string,
    regionState: string,
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
        (user_id, pollution_kind, region_state, report, damage_estimation, date, secure_url, admin_comment, latitude, longitude)
      VALUES
        (${userId},${pollutionKind},${regionState},${report},${damageEstimation},${date},${secureUrl},${adminComment},${latitude},${longitude})
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
        pollution.kind AS pollution_kind, -- new
        region.state_of_austria AS region_state, --new
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
        pollution ON events.pollution_kind = pollution.kind -- new
      INNER JOIN
        region ON events.region_state = region.state_of_austria -- new
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

// Admin sees all created events from all users, joined with firstName of users table
export const getAllEventsForAdmin = cache(async () => {
  const allEventsForAdmin = await sql<EventsForAdmin[]>`
    SELECT
      events.*,
      users.first_name
    FROM
      events
    INNER JOIN
      users ON events.user_id = users.id
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
    const allEventsForAdminFromOneUser = await sql<ViewAllEventsFromOneUser[]>`
  SELECT
    events.id AS event_id,
    pollution.kind AS pollution_kind, -- new
    region.state_of_austria AS region_state, --new
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
    pollution ON events.pollution_kind = pollution.kind -- new
  INNER JOIN
    region ON events.region_state = region.state_of_austria -- new
  WHERE
    events.user_id = ${userId}
  `;
    return allEventsForAdminFromOneUser;
  },
);
