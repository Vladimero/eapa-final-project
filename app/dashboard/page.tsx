import { LatLngExpression } from 'leaflet';
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

  // Query and display all events for the current logged-in user
  const userEvents: UserEvent[] = await getAllEventsFromUserBySessionToken(
    sessionTokenCookie.value,
  );

  // Map over the array of objects all userEvents in order to display the lat & lng
  const positions = userEvents.map((coordinates) => ({
    lat: coordinates.latitude,
    lng: coordinates.longitude,
  }));
  console.log(positions);

  // Map over the array of objects "all" userEvents in order to receive single eventId
  const eventId = userEvents.map((userId) => {
    return userId.eventId;
  });

  // Set the default lat & lng to center of Austria
  const mapCoords: LatLngExpression = [47.5162, 14.5501];

  // Query the data of Pollution & Region tables
  const pollutionKind = await getPollution();
  const regionState = await getRegion();

  return (
    <UserEventsForm
      userId={user.id}
      pollutionKind={pollutionKind}
      regionState={regionState}
      positions={positions}
      eventId={eventId}
      mapCoords={mapCoords}
      userEvents={userEvents}
      firstName={user.firstName}
    />
  );
}
