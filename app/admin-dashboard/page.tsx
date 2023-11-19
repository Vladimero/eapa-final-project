import { LatLngExpression } from 'leaflet';
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

  return (
    <>
      <div className="flex mx-10 pt-10 overflow-hidden">
        <div className="w-1/3 overflow-y-auto rounded-xl mr-4 border-2 border-gray-100">
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Admin Dashboard</h2>
          </div>
        </div>
        <div className="w-2/3 relative">
          <MapView
            positions={positions}
            userId={userId}
            mapCoords={mapCoords}
            allEventData={allEvents}
          />
          <div className="absolute bottom-0 left-0 z-10 w-full p-4">
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
