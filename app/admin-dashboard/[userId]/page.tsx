import { LatLngExpression } from 'leaflet';
import {
  getAllEventsFromOneUserForAdminByUserId,
  ViewAllEventsFromOneUser,
} from '../../../database/events';
import AdminEventsForm from './AdminEventsForm';
import MapViewSingleUser from './MapViewSingleUser';

type Props = {
  params: {
    userId: string;
  };
};

export default async function EventsFromOneUserPage(props: Props) {
  let mapCoords: LatLngExpression = [47.5162, 14.5501];

  const id = Number(props.params.userId);

  const allEventsFromOneUser: ViewAllEventsFromOneUser[] =
    await getAllEventsFromOneUserForAdminByUserId(id);

  const positions = allEventsFromOneUser.map((coordinates) => ({
    lat: coordinates.latitude,
    lng: coordinates.longitude,
  }));
  console.log(positions);

  const userId = allEventsFromOneUser.map((user) => {
    return user.userId;
  });

  return (
    <>
      <MapViewSingleUser
        positions={positions}
        userId={userId}
        mapCoords={mapCoords}
        allEventsFromOneUser={allEventsFromOneUser}
      />
      <div>
        {allEventsFromOneUser.length > 0 ? (
          <div>
            <h1>See all events from {allEventsFromOneUser[0]?.firstName}</h1>
            {allEventsFromOneUser.map((event: ViewAllEventsFromOneUser) => (
              <div key={`event-${event.eventId}`}>
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
                    Date<p>{event.date}</p>
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
                  <li>
                    <AdminEventsForm
                      eventId={event.eventId}
                      positions={positions}
                      userId={userId}
                      mapCoords={mapCoords}
                      allEventsFromOneUser={allEventsFromOneUser}
                    />
                  </li>
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <h2> The user has no events created yet</h2>
        )}
      </div>
    </>
  );
}
