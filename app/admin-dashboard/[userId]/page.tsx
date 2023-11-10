import {
  AdminEventViewOnAllEventsFromOneUser,
  getAllEventsFromOneUserForAdminByUserId,
} from '../../../database/events';
import AdminEventsForm from './AdminEventsForm';

type Props = {
  params: {
    userId: string;
  };
};

export default async function EventsFromOneUserPage(props: Props) {
  const allEventsFromOneUser = await getAllEventsFromOneUserForAdminByUserId(
    Number(props.params.userId),
  );

  return (
    <>
      <div>
        {allEventsFromOneUser.length > 0 ? (
          <div>
            {allEventsFromOneUser.map(
              (event: AdminEventViewOnAllEventsFromOneUser) => (
                <div key={`event-${event.eventId}`}>
                  <h2>See all events from {event.firstName} </h2>
                  <ul>
                    <li>
                      Report: <p>{event.report}</p>
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
                    <li>
                      <AdminEventsForm eventId={event.eventId} />
                    </li>
                  </ul>
                </div>
              ),
            )}
          </div>
        ) : (
          <h2> The user has no events created yet</h2>
        )}
      </div>
    </>
  );
}
