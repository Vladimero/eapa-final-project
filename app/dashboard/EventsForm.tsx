'use client';

import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useState } from 'react';
import { Pollution } from '../../migrations/00000-createPollution';
import { Region } from '../../migrations/00002-createRegion';
import GoogleMapView from '../components/GoogleMapView';

// Parse the props of pollution and region inside the parameters
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
  const [uploadImage, setUploadImage] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState('');
  const router = useRouter();

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  // Preview the uploaded image on page

  const handleImagePreview = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setUploadImage(file);
  };

  // Upload image to Cloudinary API

  const handleImageUpload = () => {
    if (uploadImage) {
      const formData = new FormData();
      formData.append('file', uploadImage);
      formData.append('upload_preset', `${uploadPreset}`);

      fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data && data.secure_url) {
            const url = data.secure_url;
            setImageSrc(url);
            console.log('Secure URL: ', url);

            handleEventCreation(url);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.error('No file selected for upload');
    }
  };

  const handleEventCreation = (url?: string) => {
    const secureUrl = url || imageSrc;

    if (!secureUrl) {
      console.error('No secure URL available');
      return;
    }

    fetch('/api/dashboard', {
      method: 'POST',
      body: JSON.stringify({
        userId,
        pollutionId: parseInt(pollution, 10),
        regionId: parseInt(region, 10),
        report,
        damageEstimation,
        date,
        secureUrl,
        adminComment,
      }),
    }).then(() => {
      router.refresh();
      setReport('');
      setDamageEstimation('');
      setDate('');
      setAdminComment('');
      setRegion('');
      setPollution('');
      setImageSrc('');
      setUploadImage(null);
    });
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleImageUpload();
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
            <option value="">Select a region</option>
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
            <option value="">Select a pollution</option>
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
        <img
          src={uploadImage ? URL.createObjectURL(uploadImage) : ''}
          alt="Your uploaded image"
          width={400}
          height={350}
        />

        {uploadImage && (
          <p>
            <button>Add event!</button>
          </p>
        )}
      </div>
      <br />
      <GoogleMapView />
    </form>
  );
}
