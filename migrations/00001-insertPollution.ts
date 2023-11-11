import { Sql } from 'postgres';

const pollution = [
  'air',
  'water',
  'noise',
  'plastic',
  'soil',
  'radioactive',
  'pluvial',
  'thermal',
  'biological',
];

export async function up(sql: Sql) {
  for (const kind of pollution) {
    await sql`
     INSERT INTO pollution
     (kind)
     VALUES
     (${kind})
  `;
  }
}

export async function down(sql: Sql) {
  await sql`
    DELETE FROM pollution;
  `;
}
