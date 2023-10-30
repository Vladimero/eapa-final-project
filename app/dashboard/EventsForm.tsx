'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function EventsForm({ userId }: { userId: number }) {
  const [report, setReport] = useState('');
  const [damageEstimation, setDamageEstimation] = useState('');
  const [date, setDate] = useState('');
  const [adminComment, setAdminComment] = useState('');
  const router = useRouter();

  async function handleEventCreation() {
    await fetch('/api/dashboard', {
      method: 'POST',
      body: JSON.stringify({
        userId,
        report,
        damageEstimation,
        date,
        adminComment,
      }),
    });
    router.refresh();
    setReport('');
    setDamageEstimation('');
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
        Damage Estimation:
        <input
          value={damageEstimation}
          onChange={(event) => setDamageEstimation(event.currentTarget.value)}
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
