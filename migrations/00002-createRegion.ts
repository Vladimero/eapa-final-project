import { Sql } from 'postgres';

export type Region = {
  stateOfAustria: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE region (
      state_of_austria varchar(40) PRIMARY KEY
    );
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE region;
  `;
}
