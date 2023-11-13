'use client';

import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useState } from 'react';
import { Pollution } from '../../migrations/00000-createPollution';
import { Region } from '../../migrations/00002-createRegion';
import AutocompleteAndMapView from './AutocompleteAndMapView';

// Parse the props of pollution and region inside the parameters
export default function UserEventsForm({
  userId,
  pollutionKind,
  regionState,
}: {
  userId: number;
  pollutionKind: Pollution[];
  regionState: Region[];
}) {
  const [report, setReport] = useState('');
  const [damageEstimation, setDamageEstimation] = useState('');
  const [date, setDate] = useState('');
  const [adminComment, setAdminComment] = useState('');
  const [offer, setOffer] = useState(''); // new
  const [pollution, setPollution] = useState('');
  const [region, setRegion] = useState('');
  const [uploadImage, setUploadImage] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState('');
  const router = useRouter();

  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number | null;
    lng: number | null;
  }>({
    lat: null,
    lng: null,
  });

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
        pollutionKind: pollution,
        regionState: region,
        report,
        damageEstimation,
        date,
        secureUrl,
        adminComment,
        offer,
        latitude: selectedLocation.lat,
        longitude: selectedLocation.lng,
      }),
    }).then(() => {
      router.refresh();
      setReport('');
      setDamageEstimation('');
      setDate('');
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
        if (selectedLocation.lat !== null && selectedLocation.lng !== null) {
          handleImageUpload();
        } else {
          alert('Please select an existing address.');
        }
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
            {regionState.map((region) => (
              <option
                key={`regionId-${region.stateOfAustria}`}
                value={region.stateOfAustria}
              >
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
            {pollutionKind.map((pollution) => (
              <option
                key={`pollutionId-${pollution.kind}`}
                value={pollution.kind}
              >
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

        {uploadImage &&
          selectedLocation.lat !== null &&
          selectedLocation.lng !== null && (
            <p>
              <button>Add event!</button>
            </p>
          )}
      </div>
      <br />
      <AutocompleteAndMapView
        onLocationChange={setSelectedLocation}
        // Access lat and lng values in the parent component
        onSelect={(latLng) => {
          console.log('Selected Lat:', latLng.lat);
          console.log('Selected Lng:', latLng.lng);
        }}
      />
    </form>
  );
}
