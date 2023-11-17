import { LatLngExpression } from 'leaflet';
import Link from 'next/link';
import { EventsForAdmin, getAllEventsForAdmin } from '../../database/events';
import ListForAllEvents from './ListForAllEvents';
import MapView from './MapView';

export default async function DashboardAdminPage() {
  let mapCoords: LatLngExpression = [47.5162, 14.5501];

  const allEvents: EventsForAdmin[] = await getAllEventsForAdmin();

  const positions = allEvents.map((coordinates) => ({
    lat: coordinates.latitude,
    lng: coordinates.longitude,
  }));
  console.log(positions);

  const userId = allEvents.map((user) => {
    return user.userId;
  });
  console.log(userId);

  return (
    <>
      <h1>Admin Dashboard</h1>
      <div>
        <div>
          <MapView
            positions={positions}
            userId={userId}
            mapCoords={mapCoords}
            allEventData={allEvents}
          />
          <div>
            {allEvents.length > 0 ? (
              <ListForAllEvents allEventData={allEvents} />
            ) : (
              <h2> No events created yet</h2>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
