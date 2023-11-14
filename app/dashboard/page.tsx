import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  getAllEventsFromUserBySessionToken,
  UserEvent,
} from '../../database/events';
import { getPollution } from '../../database/pollution';
import { getRegion } from '../../database/region';
import {
  getAdminByBooleanAndSessionToken,
  getUserBySessionToken,
} from '../../database/users';
import UserEventsForm from './UserEventsForm';

export default async function DashboardUserPage() {
  // 1. Check if the cookie with session token exists
  const sessionTokenCookie = cookies().get('sessionToken');

  // 2. Check if the session token is valid
  const user =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));

  // 2.5 Check here if the valid session token belongs to an admin
  const admin =
    sessionTokenCookie &&
    (await getAdminByBooleanAndSessionToken(true, sessionTokenCookie.value));

  // 2.6 If the user is an admin, redirect to the admin dashboard
  if (admin) redirect('/admin-dashboard');

  // 3. If session token is invalid redirect to login with returnTo
  // when there is no sessionToken redirect to login page. After login returnTo dashboard page
  if (!user) redirect('/login?returnTo=/dashboard');

  // Display the events for the current logged-in user
  const userEvents: UserEvent[] = await getAllEventsFromUserBySessionToken(
    sessionTokenCookie.value,
  );

  if (userEvents) {
    console.log('Checking: ', userEvents);
  }
  /*
  const positions = userEvents.map((coordinates) => ({
    lat: coordinates.latitude,
    lng: coordinates.longitude,
  }));
  console.log(positions);
*/

  const pollutionKind = await getPollution();
  const regionState = await getRegion();

  return (
    <>
      <h1>User Dashboard</h1>
      <br />
      <div>
        <UserEventsForm
          userId={user.id}
          pollutionKind={pollutionKind}
          regionState={regionState}
          userEvents={userEvents} // props for AutocompleteAndMapView
        />
      </div>
      <h2>{user.firstName}`s Events:</h2>
      <br />
      {userEvents.length > 0 ? (
        <div>
          {userEvents.map((event: UserEvent) => (
            <div key={`event-${event.eventId}`}>
              <h3>Event from the: {event.date}</h3>
              <ul>
                <li>
                  Kind of the pollution: <p>{event.pollutionKind}</p>
                </li>
                <li>
                  Region: <p>{event.regionState}</p>
                </li>
                <li>
                  Report: <p>{event.report}</p>
                </li>
                <li>
                  Damage Estimation: <p>{event.damageEstimation}</p>
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
                <li>
                  Latidude: <p>{event.latitude}</p>
                </li>
                <li>
                  Longitude: <p>{event.longitude}</p>
                </li>
                {event.adminComment ? (
                  <li>
                    Comment: <p>{event.adminComment}</p>
                  </li>
                ) : null}
                {event.offer ? (
                  <li>
                    Comment: <p>{event.offer}</p>
                  </li>
                ) : null}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <h2> No events yet</h2>
      )}
    </>
  );
}
