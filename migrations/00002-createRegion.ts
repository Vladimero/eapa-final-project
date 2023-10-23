import { Sql } from 'postgres';

export type Region = {
  id: number;
  stateOfAustria: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE region (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      state_of_austria varchar(40) NOT NULL
    );
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE region
  `;
}
