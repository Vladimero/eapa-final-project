// Dynamic route for users profile pages

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSessionByToken } from '../../../database/sessions';
import UserProfileForm from './UserProfileForm';

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
    <div className="mt-32 border-b py-8">
      <h1 className="text-3xl font-bold pb-16 text-center">
        <span className="border-[1px] p-1 rounded border-customOrange hover:text-white hover:bg-customOrange">
          {params.firstName.toUpperCase()}'s Profile
        </span>
      </h1>

      <UserProfileForm />
    </div>
  );
}
