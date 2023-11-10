import Link from 'next/link';
import { getAllEventsForAdmin } from '../../database/events';
import { Events } from '../../migrations/00008-createEvents';

export default async function DashboardAdminPage() {
  const allEvents: Events[] = await getAllEventsForAdmin();

  return (
    <>
      <h1>Admin Dashboard</h1>
      <div>
        {allEvents.length > 0 ? (
          <div>
            {allEvents.map((event: Events) => (
              <div key={`event-${event.userId}`}>
                <Link href={`/admin-dashboard/${event.userId}`}>
                  <h2>Event from the {event.date}</h2>
                </Link>
                <ul>
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
