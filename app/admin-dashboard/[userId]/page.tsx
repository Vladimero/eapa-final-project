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

  return (
    <>
      {allEventsFromOneUser.map((event: ViewAllEventsFromOneUser) => (
        <h1>View all events from: {event.firstName}</h1>
      ))}
      <MapViewSingleUser
        positions={positions}
        mapCoords={mapCoords}
        allEventsFromOneUser={allEventsFromOneUser}
      />
      <ListForAllEventsFromOneUser
        positions={positions}
        userId={userId}
        mapCoords={mapCoords}
        allEventsFromOneUser={allEventsFromOneUser}
      />
    </>
  );
}
