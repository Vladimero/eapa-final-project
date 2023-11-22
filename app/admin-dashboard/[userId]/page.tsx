import { LatLngExpression } from 'leaflet';
import Image from 'next/image';
import Link from 'next/link';
import {
  getAllEventsFromOneUserForAdminByUserId,
  ViewAllEventsFromOneUser,
} from '../../../database/events';
import ProfilePlaceholder from '../../../public/images/ProfilePlaceholder.jpeg';
// import AdminEventsForm from './AdminEventsForm';
import ListForAllEventsFromOneUser from './ListForEventsFromOneUser';
import MapViewSingleUser from './MapViewSingleUser';

type Props = {
  params: {
    userId: string;
  };
};

export default async function EventsFromOneUserPage(props: Props) {
  const mapCoords: LatLngExpression = [47.5162, 14.5501];

  const id = Number(props.params.userId);

  const allEventsFromOneUser: ViewAllEventsFromOneUser[] =
    await getAllEventsFromOneUserForAdminByUserId(id);

  const positions = allEventsFromOneUser.map((coordinates) => ({
    lat: coordinates.latitude,
    lng: coordinates.longitude,
  }));
  console.log(positions);

  const displayHeadline = allEventsFromOneUser.length > 0;

  return (
    <div className="border-b py-8">
      <div className="flex mt-36 mx-10 overflow-hidden">
        <div className="w-1/3 overflow-y-auto rounded-xl mr-4 border-2 border-gray-200 flex flex-col gap-4 items-center">
          <div className="mb-4">
            {displayHeadline && allEventsFromOneUser[0] && (
              <h1 className="text-xl font-bold mb-2 mt-4">
                {allEventsFromOneUser[0].firstName.toUpperCase()}`s reports
              </h1>
            )}
          </div>
          <div className="flex items-start">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Personal information
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Reach out the user by his phone or email
              </p>
            </div>
            <div className="ml-auto">
              <div className="rounded-full overflow-hidden">
                <Image
                  src={ProfilePlaceholder}
                  alt="Profile picture"
                  width={60}
                  height={40}
                />
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  Soso Sosovic
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Email address
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  soso@gmail.com
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Phone number
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  (+43) 676 87650093
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Address</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  Sturzgasse 1A, 1140 Vienna
                </dd>
              </div>
              <div className=" w-full flex justify-center">
                <Link
                  href="/admin-dashboard"
                  className="block bg-white hover:bg-customOrange text-grey-500 font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200 border border-gray-400 w-56 mt-10 text-center"
                >
                  Go back to all reports
                </Link>
              </div>
            </dl>
          </div>
          {/* Display AdminForm inside the left part of the page */}
          {/* {allEventsFromOneUser.map((event: ViewAllEventsFromOneUser) => (
              <div key={`eventId-${event.eventId}`}>
                <AdminEventsForm eventId={event.eventId} />
              </div>
           ))} */}
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
                  />
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
