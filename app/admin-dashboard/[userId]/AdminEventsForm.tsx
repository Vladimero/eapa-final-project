'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function AdminEventsForm({ eventId }: { eventId: number }) {
  const [adminComment, setAdminComment] = useState('');
  const [offer, setOffer] = useState('');
  const [otherOffer, setOtherOffer] = useState('');
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
    setOffer('');
    setOtherOffer('');
  }

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        if (adminComment !== '' && offer !== '') {
          await handleEventUpdate();
        } else {
          alert('Please enter a valid comment or an offer!');
        }
      }}
    >
      <div>
        {offer === 'Other' ? (
          <input
            id="individual offer"
            className="input input-bordered input-xs w-full max-w-xs"
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
            id="predefined offer"
            className="select select-bordered select-xs max-w-xs w-full focus:border-customOrange"
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
      <div className="pt-2">
        <textarea
          id="comment"
          className="textarea textarea-bordered textarea-xs w-full max-w-xs focus:border-customOrange"
          placeholder="Comment"
          maxLength={250}
          value={adminComment}
          onChange={(event) => setAdminComment(event.currentTarget.value)}
          required
        />

        {!!adminComment && (
          <div className="mt-2 flex justify-center">
            <button className="bg-white hover:bg-customOrange text-grey-500 font-bold py-1 px-4 rounded border border-gray-400 w-full text-sm">
              Send
            </button>
          </div>
        )}
      </div>
    </form>
  );
}
