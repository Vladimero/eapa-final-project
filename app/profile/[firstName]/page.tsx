// Dynamic route for users profile pages

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSessionByToken } from '../../../database/sessions';

type Props = {
  params: { firstName: string };
};

export default async function UserProfilePage({ params }: Props) {
  // 1. Check if the cookie with session token exists
  const sessionTokenCookie = cookies().get('sessionToken');

  // 2. Check if the session token is valid
  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  // 3. If session token is invalid redirect to login with returnTo
  // when there is no sessionToken redirect to login page. After login returnTo profile page
  if (!session) redirect('/login?returnTo=/profile');

  // 4. If session token is invalid redirect to the login form
  return (
    <div>
      <div>
        <h1>{params.firstName.toUpperCase()}'s Profile</h1>
      </div>
    </div>
  );
}
