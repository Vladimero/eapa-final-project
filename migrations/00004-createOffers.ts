import { Sql } from 'postgres';

export type Offers = {
  id: number;
  kind: string;
  comment: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE offers (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      kind varchar(40) NOT NULL,
      comment varchar(200) NOT NULL
    );
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE offers
  `;
}
