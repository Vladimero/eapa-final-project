import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createSession } from '../../../../database/sessions';
import { getUserWithPasswordHashByEmail } from '../../../../database/users';
import { secureCookieOptions } from '../../../../util/cookies';

const loginSchema = z.object({
  email: z.string().min(3),
  password: z.string().min(3),
});

export type LoginResponseBodyPost =
  | {
      user: { email: string; firstName: string; lastName: string };
    }
  | {
      errors: { message: string }[];
    };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<LoginResponseBodyPost>> {
  // 1. Get the user data from the request
  const body = await request.json();

  // 2. Validate the user data
  const result = loginSchema.safeParse(body);

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

  // 3. Verify user email
  const userWithPasswordHash = await getUserWithPasswordHashByEmail(
    result.data.email,
  );

  if (!userWithPasswordHash) {
    return NextResponse.json(
      { errors: [{ message: 'Email or password not valid' }] },
      { status: 403 },
    );
  }
  // 4. Verify users password comparing the hashes
  const isPasswordValid = await bcrypt.compare(
    result.data.password,
    userWithPasswordHash.passwordHash,
  );

  if (!isPasswordValid) {
    return NextResponse.json(
      { errors: [{ message: 'Email or password not valid' }] },
      { status: 401 },
    );
  }

  // 5. Create a token
  const token = crypto.randomBytes(100).toString('base64');

  // 6. Create the sessions record
  const session = await createSession(userWithPasswordHash.id, token);

  if (!session) {
    return NextResponse.json(
      { errors: [{ message: 'Error creating the new session' }] },
      {
        status: 401,
      },
    );
  }

  // 7. Send the token (inside a cookie) into the browser (header)

  cookies().set({
    name: 'sessionToken',
    value: session.token,
    ...secureCookieOptions,
  });

  // 8. Return the logged-in user

  return NextResponse.json({
    user: {
      firstName: userWithPasswordHash.firstName,
      lastName: userWithPasswordHash.lastName,
      email: userWithPasswordHash.email,
    },
  });
}
