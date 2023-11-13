import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { updateAdminCommentAndOffering } from '../../../../database/events';
import { getValidSessionByToken } from '../../../../database/sessions';

const adminCommentSchema = z.object({
  eventId: z.number(),
  adminComment: z.string().min(3),
  offer: z.string().min(3),
});

export type CreateEventResponseBodyPost =
  | {
      event: {
        eventId: number;
        adminComment: string;
        offer: string;
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
  const result = adminCommentSchema.safeParse(body);

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
  const updatedEvent = await updateAdminCommentAndOffering(
    result.data.eventId,
    result.data.adminComment,
    result.data.offer,
  );

  // 6. If the event creation fails, return an error
  if (!updatedEvent) {
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
      eventId: updatedEvent.eventId,
      adminComment: updatedEvent.adminComment,
      offer: updatedEvent.offer,
    },
  });
}
