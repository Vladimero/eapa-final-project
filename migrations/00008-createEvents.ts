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
  offer: string | null;
  latitude: number;
  longitude: number;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE
      events (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        user_id INTEGER REFERENCES users (id) ON DELETE CASCADE,
        pollution_kind VARCHAR(40) REFERENCES pollution (kind) ON DELETE CASCADE,
        region_state VARCHAR(40) REFERENCES region (
          state_of_austria
        ) ON DELETE CASCADE,
        report text NOT NULL,
        damage_estimation VARCHAR(20) NOT NULL,
        DATE VARCHAR(20) NOT NULL,
        secure_url VARCHAR(250) NOT NULL,
        admin_comment text NULL,
        offer VARCHAR(40) NULL,
        latitude NUMERIC NOT NULL,
        longitude NUMERIC NOT NULL
      );
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE events `;
}
