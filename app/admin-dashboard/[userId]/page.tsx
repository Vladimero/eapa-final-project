import { LatLngExpression } from 'leaflet';
import {
  getAllEventsFromOneUserForAdminByUserId,
  ViewAllEventsFromOneUser,
} from '../../../database/events';
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

  const userId = allEventsFromOneUser.map((user) => {
    return user.userId;
  });

  const displayHeadline = allEventsFromOneUser.length > 0;

  return (
    <>
      <div className="flex mx-10 pt-10 overflow-hidden">
        <div className="w-1/3 overflow-y-auto rounded-xl mr-4 border-2 border-gray-100">
          <div className="mb-4">
            {displayHeadline && allEventsFromOneUser[0] && (
              <h1 className="text-xl font-bold mb-2">
                View all events from: {allEventsFromOneUser[0].firstName}
              </h1>
            )}
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
              <h2> The user has no events created yet</h2>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
