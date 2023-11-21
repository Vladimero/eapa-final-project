import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { deleteSessionByToken } from '../../../database/sessions';

export async function logout() {
  // 1. Get a session token from the cookie of the browser
  const cookieFromBrowser = cookies();

  const token = cookieFromBrowser.get('sessionToken');

  // 2. Delete the session from database
  if (token) await deleteSessionByToken(token.value);

  // 3. Delete the session from browser
  cookieFromBrowser.set('sessionToken', '', {
    maxAge: -1, // Date before "now" --> means expired date
  });

  // 4. Redirect to the home page
  redirect('/');
}
