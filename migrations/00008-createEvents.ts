import { Sql } from 'postgres';

export type Events = {
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
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE events (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      user_id integer REFERENCES users (id) ON DELETE CASCADE,
      pollution_kind varchar(40) REFERENCES pollution (kind) ON DELETE CASCADE,
      region_state varchar(40) REFERENCES region (state_of_austria) ON DELETE CASCADE,
      report text NOT NULL,
      damage_estimation varchar(20) NOT NULL,
      date varchar(20) NOT NULL,
      secure_url varchar(250) NOT NULL,
      admin_comment text NULL,
      latitude numeric NOT NULL,
      longitude numeric NOT NULL
    );
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE events
  `;
}
