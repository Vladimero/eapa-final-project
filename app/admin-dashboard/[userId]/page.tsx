import { LatLngExpression } from 'leaflet';
import {
  getAllEventsFromOneUserForAdminByUserId,
  ViewAllEventsFromOneUser,
} from '../../../database/events';
import AdminEventsForm from './AdminEventsForm';
import ListForAllEventsFromOneUser from './ListForEventsFromOneUser';
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

  const eventId = allEventsFromOneUser.map((event) => {
    return event.eventId;
  });

  const displayHeadline = allEventsFromOneUser.length > 0;

  return (
    <div className="border-b py-8">
      <div className="flex mt-36 mx-10 overflow-hidden">
        <div className="w-1/3 overflow-y-auto rounded-xl mr-4 border-2 border-gray-200 flex flex-col gap-4 items-center">
          <div className="mb-4">
            {displayHeadline && allEventsFromOneUser[0] && (
              <h2 className="text-xl font-bold mb-2">
                All reports of:{' '}
                {allEventsFromOneUser[0].firstName.toUpperCase()}
              </h2>
            )}
            {allEventsFromOneUser.map((event: ViewAllEventsFromOneUser) => (
              <div key={`eventId-${event.eventId}`}>
                <AdminEventsForm eventId={event.eventId} />
              </div>
            ))}
          </div>
        </div>
        <div className="w-2/3 relative">
          <MapViewSingleUser
            positions={positions}
            mapCoords={mapCoords}
            allEventsFromOneUser={allEventsFromOneUser}
          />
          <div className="absolute bottom-0 left-0 z-10 w-full p-4">
            {allEventsFromOneUser.length > 0 ? (
              <ListForAllEventsFromOneUser
                allEventsFromOneUser={allEventsFromOneUser}
              />
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
                <span> The user has no events created yet</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
