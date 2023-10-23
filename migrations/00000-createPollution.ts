import { Sql } from 'postgres';

export type Pollution = {
  id: number;
  kind: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE pollution (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      kind varchar(40) NOT NULL
    );
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE pollution
  `;
}
