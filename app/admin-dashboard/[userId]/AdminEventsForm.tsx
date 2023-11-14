'use client';

import { LatLngExpression } from 'leaflet';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { ViewAllEventsFromOneUser } from '../../../database/events';
import MapViewSingleUser from './MapViewSingleUser';

type Position = {
  lat: number;
  lng: number;
};

export default function AdminEventsForm({
  eventId,
  positions,
  userId,
  mapCoords,
  allEventsFromOneUser,
}: {
  eventId: number;
  positions: Position[];
  userId: number[];
  mapCoords: LatLngExpression;
  allEventsFromOneUser: ViewAllEventsFromOneUser[];
}) {
  const [adminComment, setAdminComment] = useState('');
  const [offer, setOffer] = useState(''); // new
  const [otherOffer, setOtherOffer] = useState(''); // new
  const router = useRouter();

  async function handleEventUpdate() {
    await fetch('/api/admin-dashboard', {
      method: 'POST',
      body: JSON.stringify({
        eventId,
        adminComment,
        offer: offer === 'Other' ? otherOffer : offer,
      }),
    });
    router.refresh();
    setAdminComment('');
    setOffer(''); // new
    setOtherOffer(''); // new
  }

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (adminComment !== '') {
            handleEventUpdate();
          } else {
            alert('Please enter a valid comment!');
          }
        }}
      >
        <div>
          <label>Select an offering</label>
          {offer === 'Other' ? (
            <input
              type="text"
              placeholder="Enter your offering"
              value={otherOffer}
              onChange={(event) =>
                setOtherOffer(event.currentTarget.value.slice(0, 40))
              }
              maxLength={40}
              required
            />
          ) : (
            <select
              value={offer}
              onChange={(event) => setOffer(event.currentTarget.value)}
              required
            >
              <option value="">Select an offering</option>
              <option>Appointment</option>
              <option>Investigation</option>
              <option>Improvement</option>
              <option>Cleaning</option>
              <option>Mending</option>
              <option>Repair</option>
              <option>Other</option>
            </select>
          )}
        </div>
        <div>
          <label>
            Admin Comment:
            <textarea
              maxLength={250}
              value={adminComment}
              onChange={(event) => setAdminComment(event.currentTarget.value)}
              required
            />
          </label>
          {adminComment && (
            <p>
              <button>Add event!</button>
            </p>
          )}
        </div>
      </form>
    </>
  );
}
