// This is the main "platform" or "Community" page, where the user takes actions after he registered and signed in --> Only logged-in user is allowed to access this page

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getPollution } from '../../database/pollution';
import { getRegion } from '../../database/region';
import {
  getUserBySessionToken,
  getUserEventBySessionToken,
} from '../../database/users';
import EventsForm from './EventsForm';

export default async function DashboardPage() {
  // 1. Check if the cookie with session token exists
  const sessionTokenCookie = cookies().get('sessionToken');

  // 2. Check if the session token is valid
  const user =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));

  // 2.5 Check here if the valid session token belongs to an admin --> query database for it (getAdminUserBySessionToken)

  // 3. If session token is invalid redirect to login with returnTo
  // when there is no sessionToken redirect to login page. After login returnTo dashboard page
  if (!user) redirect('/login?returnTo=/dashboard');

  // Display the events for the current logged-in user
  const userEvent = await getUserEventBySessionToken(sessionTokenCookie.value);

  // Display the pollution and region calling the function of database query
  const pollutionId = await getPollution();
  const regionId = await getRegion();

  return (
    <>
      <h1>Dashboard</h1>
      <br />

      <div>
        <EventsForm
          userId={user.id} // call the props inside the form
          pollutionId={pollutionId} // call the props inside the form
          regionId={regionId} // call the props inside the form
        />
      </div>

      {/* <div>
        {userEvent.length > 0 ? (
          <>
            <h2>Events For {user.firstName}</h2>
            <ul>
              {userEvent.map((event) => (
                <ul>
                  <li key={`event-${event.eventId}`}>{event.report}</li>
                  <li>{event.damageEstimation}</li>
                  <li>{event.date}</li>
                  <li>{event.adminComment}</li>
                </ul>
              ))}
            </ul>
          </>
        ) : (
          <h2> No events yet</h2>
        )}
      </div> */}
    </>
  );
}
