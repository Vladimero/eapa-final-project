'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function AdminEventsForm({ eventId }: { eventId: number }) {
  const [adminComment, setAdminComment] = useState('');
  const router = useRouter();

  async function handleEventUpdate() {
    await fetch('/api/admin-dashboard', {
      method: 'POST',
      body: JSON.stringify({
        eventId,
        adminComment,
      }),
    });
    router.refresh();
    setAdminComment('');
  }

  return (
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
    </form>
  );
}
