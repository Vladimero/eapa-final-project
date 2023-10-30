import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createEvent } from '../../../../database/events';
import { getValidSessionByToken } from '../../../../database/sessions';

const eventSchema = z.object({
  userId: z.number(),
  // pollutionId: z.number(),
  // regionId: z.number(),
  report: z.string().min(3),
  damageEstimation: z.string().min(3),
  date: z.string().min(3),
  adminComment: z.string().min(3),
});

export type CreateEventResponseBodyPost =
  | {
      event: {
        report: string;
        damageEstimation: string;
        date: string;
        adminComment: string;
      };
    }
  | {
      errors: { message: string }[];
    };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<CreateEventResponseBodyPost>> {
  // 1. Get the event data from the request
  const body = await request.json();

  // 2. Validate the data
  const result = eventSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { errors: result.error.issues },
      {
        status: 400,
      },
    );
  }

  // 1. get the token from the cookie
  const sessionTokenCookie = cookies().get('sessionToken');

  // 2. check if the token has a valid session
  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  if (!session) {
    return NextResponse.json(
      {
        errors: [{ message: 'Authentication token is invalid' }],
      },
      { status: 401 },
    );
  }

  // 3. Create the event
  const newEvent = await createEvent(
    result.data.userId,
    // result.data.pollutionId,
    // result.data.regionId,
    result.data.report,
    result.data.damageEstimation,
    result.data.date,
    result.data.adminComment,
  );

  // 4. If the event creation fails, return an error

  if (!newEvent) {
    return NextResponse.json(
      {
        errors: [{ message: 'Event creation failed' }],
      },
      { status: 500 },
    );
  }

  // 6. Return the event
  return NextResponse.json({
    event: {
      // userId: newEvent.userId,
      // pollutionId: newEvent.pollutionId,
      // regionId: newEvent.regionId,
      report: newEvent.report,
      damageEstimation: newEvent.damageEstimation,
      date: newEvent.date,
      adminComment: newEvent.adminComment,
    },
  });
}
