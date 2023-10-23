import { Sql } from 'postgres';

const region = [
  {
    id: 1,
    stateOfAustria: 'Vienna',
  },
  {
    id: 2,
    stateOfAustria: 'Niederösterreich',
  },
  {
    id: 3,
    stateOfAustria: 'Oberösterreich',
  },
  {
    id: 4,
    stateOfAustria: 'Salzburg',
  },
  {
    id: 5,
    stateOfAustria: 'Steiermark',
  },
  {
    id: 6,
    stateOfAustria: 'Burgenland',
  },
  {
    id: 7,
    stateOfAustria: 'Kärnten',
  },
  {
    id: 8,
    stateOfAustria: 'Tirol',
  },
  {
    id: 9,
    stateOfAustria: 'Vorarlberg',
  },
];

export async function up(sql: Sql) {
  for (const regionState of region) {
    await sql`
     INSERT INTO region
     (state_of_austria)
     VALUES
     (${regionState.stateOfAustria})
  `;
  }
}

export async function down(sql: Sql) {
  for (const regionState of region) {
    await sql`
     DELETE FROM region WHERE id = ${regionState.id}
    `;
  }
}
