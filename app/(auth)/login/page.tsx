import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSessionByToken } from '../../../database/sessions';
import LoginForm from './LoginForm';

type Props = { searchParams: { returnTo?: string | string[] } };

export default async function LoginPage({ searchParams }: Props) {
  // 1. Check if the cookie with session token exists
  const sessionTokenCookie = cookies().get('sessionToken');

  // 2. Check if the session token is valid
  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  // 3. If session token is valid redirect to homepage
  if (session) redirect('/');

  // 4. If session token is invalid redirect to the login form

  return (
    <div>
      <LoginForm returnTo={searchParams.returnTo} />
    </div>
  );
}
