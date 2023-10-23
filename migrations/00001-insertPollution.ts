import { Sql } from 'postgres';

const pollution = [
  {
    id: 1,
    kind: 'air',
  },
  {
    id: 2,
    kind: 'water',
  },
  {
    id: 3,
    kind: 'noise',
  },
  {
    id: 4,
    kind: 'plastic',
  },
  {
    id: 5,
    kind: 'soil',
  },
  {
    id: 6,
    kind: 'radioactive',
  },
  {
    id: 7,
    kind: 'pluvial',
  },
  {
    id: 8,
    kind: 'thermal',
  },
  {
    id: 9,
    kind: 'biological',
  },
];

export async function up(sql: Sql) {
  for (const pollutionKind of pollution) {
    await sql`
     INSERT INTO pollution
     (kind)
     VALUES
     (${pollutionKind.kind})
  `;
  }
}

export async function down(sql: Sql) {
  for (const pollutionKind of pollution) {
    await sql`
     DELETE FROM pollution WHERE id = ${pollutionKind.id}
    `;
  }
}
