'use client';
import { CldImage, CldUploadButton } from 'next-cloudinary';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useState } from 'react';
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
  const [uploadImage, setUploadImage] = useState<FileList | undefined>(
    undefined,
  );
  const [imageSrc, setImageSrc] = useState('');
  const router = useRouter();

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

  // Preview the uploaded image on page

  function handleImagePreview(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;

    if (files && files.length > 0) {
      const reader = new FileReader();

      reader.onload = function (onLoadEvent) {
        if (onLoadEvent.target) {
          const result = onLoadEvent.target.result;
          if (typeof result === 'string') {
            setImageSrc(result);
          }
        }
        setUploadImage(undefined);
      };

      reader.readAsDataURL(files[0] as Blob);
    }
  }

  // Upload image to cloudinary API

  async function handleImageUpload(event: React.FormEvent<HTMLFormElement>) {
    const form = event.currentTarget.closest('form') as HTMLFormElement | null;

    if (form) {
      const fileInput = Array.from(form.elements).find(
        (element) =>
          element instanceof HTMLInputElement && element.name === 'file',
      ) as HTMLInputElement | undefined;

      if (fileInput && fileInput.files) {
        const formData = new FormData();

        for (const file of fileInput.files) {
          formData.append('file', file);
        }

        formData.append('upload_preset', 'my_uploads');

        const data = await fetch(
          'https://api.cloudinary.com/v1_1/djtcj6spv/image/upload',
          {
            method: 'POST',
            body: formData,
          },
        ).then((response) => response.json());

        setImageSrc(data.secure_url);
        setUploadImage(data);
      }
    }
  }

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        handleImageUpload(event);
        await handleEventCreation();
      }}
    >
      <div>
        <label>
          Region:
          <select
            value={region}
            onChange={(event) => setRegion(event.currentTarget.value)}
            required
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
            required
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
        <textarea
          maxLength={250}
          value={report}
          onChange={(event) => setReport(event.currentTarget.value)}
          required
        />
      </label>
      <label>
        Damage Estimation:
        <input
          value={damageEstimation}
          onChange={(event) => setDamageEstimation(event.currentTarget.value)}
          required
        />
      </label>
      <label>
        Date:
        <input
          value={date}
          onChange={(event) => setDate(event.currentTarget.value)}
          required
        />
      </label>
      <label>
        Admin Comment:
        <textarea
          maxLength={250}
          value={adminComment}
          onChange={(event) => setAdminComment(event.currentTarget.value)}
          required
        />
      </label>
      <br />

      <p>Upload images!</p>
      <div>
        <p>
          <input
            type="file"
            name="file"
            accept=".jpg, .png, .jpeg"
            onChange={handleImagePreview}
            required
          />
        </p>
        <img src={imageSrc} alt="Your image" width={400} height={350} />

        {imageSrc && !uploadImage && (
          <p>
            <button>Add event!</button>
          </p>
        )}
        {uploadImage && (
          <code>
            <pre>{JSON.stringify(uploadImage, null, 2)}</pre>
          </code>
        )}
      </div>
      <br />
    </form>
  );
}
