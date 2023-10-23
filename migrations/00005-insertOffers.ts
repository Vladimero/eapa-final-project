import { Sql } from 'postgres';

const offers = [
  {
    id: 1,
    kind: 'appointment',
    comment: '',
  },
  {
    id: 2,
    kind: 'investigation',
    comment: '',
  },
  {
    id: 3,
    kind: 'improvement',
    comment: '',
  },
  {
    id: 4,
    kind: 'cleaning',
    comment: '',
  },
  {
    id: 5,
    kind: 'mending',
    comment: '',
  },
  {
    id: 6,
    kind: 'repair',
    comment: '',
  },
];

export async function up(sql: Sql) {
  for (const offer of offers) {
    await sql`
     INSERT INTO offers
     (kind, comment)
     VALUES
     (${offer.kind}, ${offer.comment})
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
