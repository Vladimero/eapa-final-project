import { Sql } from 'postgres';

const regions = [
  'Vienna',
  'Niederösterreich',
  'Oberösterreich',
  'Salzburg',
  'Steiermark',
  'Burgenland',
  'Kärnten',
  'Tirol',
  'Vorarlberg',
];

export async function up(sql: Sql) {
  for (const stateOfAustria of regions) {
    await sql`
     INSERT INTO region
     (state_of_austria)
     VALUES
     (${stateOfAustria})
  `;
  }
}

export async function down(sql: Sql) {
  await sql`
    DELETE FROM region;
  `;
}
