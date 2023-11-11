import { Sql } from 'postgres';

export type Pollution = {
  kind: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE pollution (
      kind varchar(40) PRIMARY KEY
    );
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE pollution;
  `;
}
