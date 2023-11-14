import { LatLngExpression } from 'leaflet';
import Link from 'next/link';
import { EventsForAdmin, getAllEventsForAdmin } from '../../database/events';
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
        <MapView
          positions={positions}
          userId={userId}
          mapCoords={mapCoords}
          allEventData={allEvents}
        />

        {allEvents.length > 0 ? (
          <div>
            {allEvents.map((event: EventsForAdmin) => (
              <div key={`event-${event.userId}`}>
                <Link href={`/admin-dashboard/${event.userId}`}>
                  <h2>
                    {event.firstName}`s event from: {event.date}
                  </h2>
                </Link>
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
                  <Link href={`/admin-dashboard/${event.userId}`}>
                    <li>
                      Image:
                      <img
                        src={event.secureUrl}
                        alt="no image yet"
                        width={400}
                        height={350}
                      />
                    </li>
                  </Link>
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
          <h2> No events created yet</h2>
        )}
      </div>
    </>
  );
}
