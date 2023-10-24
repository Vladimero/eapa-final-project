import { Sql } from 'postgres';

const offers = [
  {
    id: 1,
    kind: 'appointment',
  },
  {
    id: 2,
    kind: 'investigation',
  },
  {
    id: 3,
    kind: 'improvement',
  },
  {
    id: 4,
    kind: 'cleaning',
  },
  {
    id: 5,
    kind: 'mending',
  },
  {
    id: 6,
    kind: 'repair',
  },
];

export async function up(sql: Sql) {
  for (const offer of offers) {
    await sql`
     INSERT INTO offers
     (kind)
     VALUES
     (${offer.kind})
  `;
  }
}

export async function down(sql: Sql) {
  for (const offer of offers) {
    await sql`
     DELETE FROM offers WHERE id = ${offer.id}
    `;
  }
}
