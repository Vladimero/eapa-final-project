'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Pollution } from '../../migrations/00000-createPollution';
import { Region } from '../../migrations/00002-createRegion';

// parse the props of pollution and region inside the parameters
export default function EventsForm({
  userId,
  pollutionId,
  regionId,
}: {
  userId: number;
  pollutionId: Pollution[];
  regionId: Region[];
}) {
  const [report, setReport] = useState('');
  const [damageEstimation, setDamageEstimation] = useState('');
  const [date, setDate] = useState('');
  const [adminComment, setAdminComment] = useState('');
  const [pollution, setPollution] = useState('');
  const [region, setRegion] = useState('');
  const router = useRouter();

  console.log(pollutionId, regionId);

  async function handleEventCreation() {
    await fetch('/api/dashboard', {
      method: 'POST',
      body: JSON.stringify({
        userId,
        pollutionId: parseInt(pollution, 10),
        regionId: parseInt(region, 10),
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
    setRegion('');
    setPollution('');
  }

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        await handleEventCreation();
      }}
    >
      <div>
        <label>
          Region:
          <select
            value={region}
            onChange={(event) => setRegion(event.currentTarget.value)}
          >
            {regionId.map((region) => (
              <option key={`regionId-${region.id}`} value={region.id}>
                {region.stateOfAustria}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <label>
          Pollution:
          <select
            value={pollution}
            onChange={(event) => setPollution(event.currentTarget.value)}
          >
            {pollutionId.map((pollution) => (
              <option key={`pollutionId-${pollution.id}`} value={pollution.id}>
                {pollution.kind}
              </option>
            ))}
          </select>
        </label>
      </div>

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
