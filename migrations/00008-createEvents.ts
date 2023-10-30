import { Sql } from 'postgres';

export type Events = {
  id: number;
  userId: number;
  // pollutionId: number;
  // regionId: number;
  report: string;
  damageEstimation: string;
  date: string;
  adminComment: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE events (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      user_id integer REFERENCES users (id) ON DELETE CASCADE,
      report text NOT NULL,
      damage_estimation varchar(20) NOT NULL,
      date varchar(20) NOT NULL,
      admin_comment text NOT NULL
    );
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE events
  `;
}

// pollution_id integer REFERENCES pollution (id) ON DELETE CASCADE,
// region_id integer REFERENCES region (id) ON DELETE CASCADE,
