// This is the main "platform" or "Community" page, where the user takes actions after he registered and signed in --> Only logged-in user is allowed to access this page

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getPollution } from '../../database/pollution';
import { getRegion } from '../../database/region';
import {
  getAllEventsFromUserBySessionToken,
  getUserBySessionToken,
  UserEvent,
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
  const userEvent: UserEvent[] = await getAllEventsFromUserBySessionToken(
    sessionTokenCookie.value,
  );

  if (userEvent) {
    console.log('Checking: ', userEvent);
  }

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

      {userEvent.length > 0 ? (
        <div>
          {userEvent.map((event: UserEvent) => (
            <div key={`event-${event.eventId}`}>
              <h1>Events from {event.firstName}</h1>
              <ul>
                <li>
                  Report: <p>{event.report}</p>
                </li>
                <li>
                  Damage Estimation: <p>{event.damageEstimation}</p>
                </li>
                <li>
                  Date: <p>{event.date}</p>
                </li>
                <li>
                  Image:
                  <img
                    src={event.secureUrl}
                    alt="no image yet"
                    width={400}
                    height={350}
                  />
                </li>
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <h2> No events yet</h2>
      )}

      {/*  <div>
        <ul>
          <h2> Events for {userEvent.firstName}</h2>
          <li>{userEvent?.pollutionId}</li>
          <li>{userEvent?.regionId}</li>
          <li>{userEvent?.report}</li>
          <li>{userEvent?.damageEstimation}</li>
          <li>{userEvent?.date}</li>
          <li>{userEvent?.adminComment}</li>
          <li>
            Image:
            <img src={userEvent?.secureUrl} alt="no image yet" />
          </li>
        </ul>
        </div> */}
    </>
  );
}
