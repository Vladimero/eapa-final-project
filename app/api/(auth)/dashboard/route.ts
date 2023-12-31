import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createEvent } from '../../../../database/events';
import { getValidSessionByToken } from '../../../../database/sessions';

const eventSchema = z.object({
  userId: z.number(),
  pollutionKind: z.string(),
  regionState: z.string(),
  report: z.string().min(3),
  damageEstimation: z.string().min(3),
  date: z.string().min(3),
  secureUrl: z.string().min(3),
  adminComment: z.string().min(0).nullable(),
  offer: z.string().min(0).nullable(), // new
  latitude: z.number(),
  longitude: z.number(),
});

export type CreateEventResponseBodyPost =
  | {
      event: {
        userId: number;
        pollutionKind: string;
        regionState: string;
        report: string;
        damageEstimation: string;
        date: string;
        secureUrl: string;
        adminComment: string | null;
        offer: string | null; // new
        latitude: number;
        longitude: number;
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

  // 3. get the token from the cookie
  const sessionTokenCookie = cookies().get('sessionToken');

  // 4. check if the token has a valid session
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

  // 5. Create the event
  const newEvent = await createEvent(
    result.data.userId,
    result.data.pollutionKind,
    result.data.regionState,
    result.data.report,
    result.data.damageEstimation,
    result.data.date,
    result.data.secureUrl,
    result.data.adminComment ?? null,
    result.data.offer ?? null, // new
    result.data.latitude,
    result.data.longitude,
  );

  // 6. If the event creation fails, return an error

  if (!newEvent) {
    return NextResponse.json(
      {
        errors: [{ message: 'Event creation failed' }],
      },
      { status: 500 },
    );
  }

  // 7. Return the event
  return NextResponse.json({
    event: {
      userId: newEvent.userId,
      pollutionKind: newEvent.pollutionKind,
      regionState: newEvent.regionState,
      report: newEvent.report,
      damageEstimation: newEvent.damageEstimation,
      date: newEvent.date,
      secureUrl: newEvent.secureUrl,
      adminComment: newEvent.adminComment,
      offer: newEvent.offer, // new
      latitude: newEvent.latitude,
      longitude: newEvent.longitude,
    },
  });
}
