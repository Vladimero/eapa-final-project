import { Sql } from 'postgres';

export type Users = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE users (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      first_name varchar(30) NOT NULL,
      last_name varchar(30) NOT NULL,
      email varchar(50) NOT NULL UNIQUE,
      password_hash varchar(80) NOT NULL,
      is_admin boolean NOT NULL
    );
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE users
  `;
}
