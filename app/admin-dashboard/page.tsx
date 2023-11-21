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

  return (
    <div className="border-b py-8">
      <div className="flex mt-36 mx-10 overflow-hidden">
        <div // className="w-1/3 overflow-y-auto rounded-xl mr-4 border-2 border-gray-200 flex flex-col gap-4 items-center"
          className="w-1/3 overflow-y-auto rounded-xl mr-4 border-2 border-gray-200"
        >
          <div className="p-4">
            <h1 className="text-xl font-bold mb-8 text-center">
              Admin Dashboard
            </h1>
            <div className="flex flex-col gap-4">
              <div className="bg-white border rounded-xl overflow-hidden shadow-md flex items-center">
                <div className="p-4 bg-green-400 rounded-l-xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    ></path>
                  </svg>
                </div>
                <div className="px-4 text-gray-700">
                  <h3 className="text-sm tracking-wider">Users</h3>
                  <p className="text-3xl hover:text-customOrange">5468</p>
                </div>
              </div>
              <div className="bg-white border rounded-xl overflow-hidden shadow-md flex items-center">
                <div className="p-4 bg-blue-400 rounded-l-xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                    ></path>
                  </svg>
                </div>
                <div className="px-4 text-gray-700">
                  <h3 className="text-sm tracking-wider">Reports</h3>
                  <p className="text-3xl hover:text-customOrange">14.203</p>
                </div>
              </div>
              <div className="bg-white border rounded-xl overflow-hidden shadow-md flex items-center">
                <div className="p-4 bg-indigo-400 rounded-l-xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                    ></path>
                  </svg>
                </div>
                <div className="px-4 text-gray-700">
                  <h3 className="text-sm tracking-wider">Comments</h3>
                  <p className="text-3xl hover:text-customOrange">37.779</p>
                </div>
              </div>
              <div className="bg-white border rounded-xl overflow-hidden shadow-md flex items-center">
                <div className="p-4 bg-red-400 rounded-l-xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                    ></path>
                  </svg>
                </div>
                <div className="px-4 text-gray-700">
                  <h3 className="text-sm tracking-wider">Solved</h3>
                  <p className="text-3xl hover:text-customOrange">76.12%</p>
                </div>
              </div>
              <div className=" w-full flex justify-center">
                <Link
                  href="/"
                  className="block bg-white hover:bg-customOrange text-grey-500 font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200 border border-gray-400 w-48 mt-10 text-center"
                >
                  Back to homepage
                </Link>
              </div>
            </div>
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
