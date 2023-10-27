'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function EventsForm({
  userId,
  pollutionId,
  regionId,
}: {
  userId: number;
  pollutionId: number;
  regionId: number;
}) {
  const [report, setReport] = useState('');
  const [adminComment, setAdminComment] = useState('');
  const [date, setDate] = useState('');
  const router = useRouter();

  async function handleEventCreation() {
    await fetch('/api/events', {
      method: 'POST',
      body: JSON.stringify({
        userId,
        pollutionId,
        regionId,
        report,
        date,
        adminComment,
      }),
    });
    router.refresh();
    setReport('');
    setDate('');
    setAdminComment('');
  }

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        await handleEventCreation();
      }}
    >
      <label>
        Report:
        <input
          value={report}
          onChange={(event) => setReport(event.currentTarget.value)}
        />
      </label>
      <label>
        Date:
        <input
          value={date}
          onChange={(event) => setDate(event.currentTarget.value)}
        />
      </label>
      <label>
        Admin Comment:
        <input
          value={adminComment}
          onChange={(event) => setAdminComment(event.currentTarget.value)}
        />
      </label>
      <br />
      <br />
      <button>Add event</button>
    </form>
  );
}
