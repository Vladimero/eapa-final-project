// Database query functions: effect only the database

import { cache } from 'react';
import { sql } from '../database/connect';
import { Users } from '../migrations/00006-createUsers';

export type UserWithPasswordHash = Users & {
  passwordHash: string;
};

// function to insert data into the database, (if data is predefined in database this step is done through migrations!)
// to send user-generated data into the database this function is used in the POST request of the API

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
        email
      FROM
        users
      WHERE
        email = ${email}
  `;
  return user;
});

// For displaying his first name anywhere
export const getUserByFirstName = cache(async (firstName: string) => {
  const [user] = await sql<Users[]>`
      SELECT
        id,
        first_name
      FROM
        users
      WHERE
        first_name = ${firstName}
  `;
  return user;
});

// For role concerned displaying information to the user
export const getUserByRole = cache(async (isAdmin: boolean) => {
  const [user] = await sql<Users[]>`
      SELECT
        id,
        is_admin
      FROM
        users
      WHERE
        is_admin = ${isAdmin}
  `;
  return user;
});

// For login page: ensure that only registered users can log in
export const getUserWithPasswordHashByEmail = cache(async (email: string) => {
  const [user] = await sql<UserWithPasswordHash[]>`
      SELECT
        *
      FROM
        users
      WHERE
        email = ${email.toLocaleLowerCase()}
  `;
  return user;
});

// Inner join compares the tables parallel
export const getUserBySessionToken = cache(async (token: string) => {
  const [user] = await sql<Users[]>`
      SELECT
        users.id,
        users.email
      FROM
        users
      INNER JOIN
        sessions ON (
          sessions.token = ${token} AND
          sessions.user_id = users.id AND
          sessions.expiry_timestamp > now()
        )
  `;
  return user;
});
