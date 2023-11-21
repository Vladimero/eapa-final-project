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
    <div className="border-b py-8">
      <div className="flex mt-36 mx-10 overflow-hidden">
        <div className="w-1/3 overflow-y-auto rounded-xl mr-4 border-2 border-gray-200 flex flex-col gap-4 items-center">
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
              <div role="alert" className="alert">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="stroke-info shrink-0 w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span> No events created yet</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
