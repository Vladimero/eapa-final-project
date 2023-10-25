import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createSession } from '../../../../database/sessions';
import { createUser, getUserByEmail } from '../../../../database/users';
import { Users } from '../../../../migrations/00006-createUsers';
import { secureCookieOptions } from '../../../../util/cookies';

const registerSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().min(3),
  password: z.string().min(3),
  isAdmin: z.boolean(),
});

export type RegisterResponseBodyPost =
  | {
      user: Users;
    }
  | {
      errors: { message: string }[];
    };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<RegisterResponseBodyPost>> {
  // 1. Get the user data from the request
  const body = await request.json();

  // 2. Validate the user data
  const result = registerSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        errors: result.error.issues,
      },
      {
        status: 400,
      },
    );
  }

  // 3. Check if user already exists
  const user = await getUserByEmail(result.data.email);

  if (user) {
    return NextResponse.json(
      { errors: [{ message: 'email is already taken' }] },
      { status: 403 },
    );
  }

  // 3.5 confirm email & password validation pass here!

  // 4. Hash the plain password
  const passwordHash = await bcrypt.hash(result.data.password, 12);

  // 5. Save the user with hashed password into database
  const newUser = await createUser(
    result.data.firstName,
    result.data.lastName,
    result.data.email,
    passwordHash,
    result.data.isAdmin,
  );

  // Prevent if there was not created a new user from returning
  if (!newUser) {
    return NextResponse.json(
      { errors: [{ message: 'Error creating the new user' }] },
      { status: 406 },
    );
  }

  // 6. Create a token
  const token = crypto.randomBytes(100).toString('base64');

  // 7. Create the sessions record
  const session = await createSession(newUser.id, token);

  if (!session) {
    return NextResponse.json(
      { errors: [{ message: 'Error creating the new session' }] },
      {
        status: 401,
      },
    );
  }

  // 8. Send the token (inside a cookie) into the browser (header)

  cookies().set({
    name: 'sessionToken',
    value: session.token,
    ...secureCookieOptions,
  });

  // 9. Return the new user without password hash

  return NextResponse.json({
    user: newUser,
  });
}
