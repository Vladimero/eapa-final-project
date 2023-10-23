import 'server-only';
import { cache } from 'react';
import { sql } from '../database/connect';
import { Users } from '../migrations/00006-createUsers';

export type UserWithPasswordHash = Users & {
  passwordHash: string;
};

export const createUser = cache(
  async (
    firstName: string,
    lastName: string,
    email: string,
    passwordHash: string,
    isAdmin: boolean,
  ) => {
    const [user] = await sql<Users[]>`
       INSERT INTO users
        (first_name, last_name, email, password_hash, is_admin)
       VALUES
        (${firstName.toLowerCase()}, ${lastName.toLowerCase()}, ${email.toLowerCase()}, ${passwordHash}, ${isAdmin})
       RETURNING
         id,
         first_name,
         last_name,
         email,
         is_admin
    `;
    return user;
  },
);

export const getUserByEmail = cache(async (email: string) => {
  const [user] = await sql<Users[]>`
      SELECT
        id,
        first_name,
        last_name,
        email,
        is_admin
      FROM
        users
      WHERE
        email = ${email}
  `;
  return user;
});
