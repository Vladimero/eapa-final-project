'use client';

import { LatLngExpression } from 'leaflet';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useState } from 'react';
import { UserEvent } from '../../database/events';
import { Pollution } from '../../migrations/00000-createPollution';
import { Region } from '../../migrations/00002-createRegion';
import AutocompleteAndMapView, { Position } from './AutocompleteAndMapView';
import RecentCreatedEvent from './RecentCreatedEvent';

export default function UserEventsForm({
  userId,
  pollutionKind,
  regionState,
  positions, // props for AutocompleteAndMapView
  eventId, // props for AutocompleteAndMapView
  mapCoords, // props for AutocompleteAndMapView
  userEvents, // props for AutocompleteAndMapView
  firstName,
  cloudName,
  uploadPreset,
  mapsKey,
}: {
  userId: number;
  pollutionKind: Pollution[];
  regionState: Region[];
  positions: Position[];
  eventId: number[];
  mapCoords: LatLngExpression;
  userEvents: UserEvent[];
  firstName: string;
  cloudName: string | undefined;
  uploadPreset: string | undefined;
  mapsKey: string | undefined;
}) {
  const [report, setReport] = useState('');
  const [damageEstimation, setDamageEstimation] = useState('');
  const [date, setDate] = useState('');
  const [adminComment, setAdminComment] = useState('');
  const [offer, setOffer] = useState('');
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

  const displayHeadline = userEvents.length > 0 || userEvents.length === 0;
  const displayFirstName = firstName;

  // Create an event and send data to events table
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
    })
      .then((response) => {
        console.log('Image details saved:', response);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    router.refresh();
    setReport('');
    setDamageEstimation('');
    setDate('');
    setAdminComment('');
    setOffer('');
    setRegion('');
    setPollution('');
    setImageSrc('');
    setUploadImage(null);
  };

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

            return handleEventCreation(url);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.error('No file selected for upload');
    }
  };

  return (
    <div className="border-b py-8">
      <div className="flex mt-36 mx-10 overflow-hidden">
        <form
          className="w-1/3 overflow-y-auto rounded-xl mr-4 border-2 border-gray-200 flex flex-col gap-4 items-center"
          onSubmit={(event) => {
            event.preventDefault();
            if (
              selectedLocation.lat !== null &&
              selectedLocation.lng !== null
            ) {
              handleImageUpload();
            } else {
              alert('Please select an existing address.');
            }
          }}
        >
          <div className="mb-4">
            {displayHeadline ? (
              <h1 className="text-xl font-bold mb-2 mt-4 text-grey">
                {userEvents.length > 0
                  ? `${userEvents[0]?.firstName?.toUpperCase()}'s Dashboard`
                  : `${displayFirstName.toUpperCase()}'s Dashboard`}
              </h1>
            ) : null}
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex gap-4">
              <select
                id="region"
                className="select select-bordered select-xs max-w-xs w-36 focus:border-customOrange"
                value={region}
                onChange={(event) => setRegion(event.currentTarget.value)}
                required
              >
                <option value="">Select a region</option>
                {regionState.map((states) => (
                  <option
                    key={`regionId-${states.stateOfAustria}`}
                    value={states.stateOfAustria}
                  >
                    {states.stateOfAustria}
                  </option>
                ))}
              </select>
              <select
                id="pollution"
                className="select select-bordered select-xs max-w-xs w-36 focus:border-customOrange"
                value={pollution}
                onChange={(event) => setPollution(event.currentTarget.value)}
                required
              >
                <option value="">Select a pollution</option>
                {pollutionKind.map((kinds) => (
                  <option key={`pollutionId-${kinds.kind}`} value={kinds.kind}>
                    {kinds.kind}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <textarea
                id="report"
                placeholder="Type your report here"
                className="input input-bordered input-md w-full max-w-xs text-gray-700 focus:outline-none border-b-4 focus:border-customOrange transition duration-500 px-3 pb-3"
                maxLength={250}
                value={report}
                onChange={(event) => setReport(event.currentTarget.value)}
                required
              />
            </div>

            <select
              id="damage"
              className="select select-bordered select-xs max-w-xs w-full focus:border-customOrange"
              value={damageEstimation}
              onChange={(event) =>
                setDamageEstimation(event.currentTarget.value)
              }
              required
            >
              <option value="">Estimate the damage</option>
              <option>not at all</option>
              <option>neutral</option>
              <option>small</option>
              <option>medium</option>
              <option>high</option>
              <option>huge</option>
              <option>can not be assessed</option>
            </select>

            <input
              id="date"
              className="input input-bordered input-sm w-full max-w-xs text-gray-700  focus:border-customOrange transition duration-500 px-3 pb-3"
              type="date"
              value={date}
              onChange={(event) => setDate(event.currentTarget.value)}
              required
            />
          </div>

          <div className="flex flex-col items-center">
            <input
              type="file"
              id="fileInput"
              className="file-input file-input-bordered file-input-accent w-full max-w-xs"
              name="file"
              accept=".jpg, .png, .jpeg"
              onChange={handleImagePreview}
              required
            />
            <div className="preview-container p-6 flex flex-col items-center">
              <Image
                src={uploadImage ? URL.createObjectURL(uploadImage) : ''}
                alt="Your uploaded picture"
                width={300}
                height={250}
              />

              {uploadImage &&
                selectedLocation.lat !== null &&
                selectedLocation.lng !== null && (
                  <div className="mt-2 flex justify-center">
                    <button className="bg-white hover:bg-customOrange text-grey-500 font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200 border border-gray-400 w-24">
                      Create
                    </button>
                  </div>
                )}
            </div>
          </div>
        </form>

        <div className="w-2/3 relative">
          <AutocompleteAndMapView
            onLocationChange={setSelectedLocation}
            onSelect={(latLng) => {
              console.log('Selected Lat:', latLng.lat);
              console.log('Selected Lng:', latLng.lng);
            }}
            positions={positions}
            eventId={eventId}
            mapCoords={mapCoords}
            userEvents={userEvents}
            mapsKey={mapsKey}
          />
          <div className="absolute bottom-0 left-0 z-10 w-full p-4">
            {userEvents.length > 0 ? (
              <RecentCreatedEvent createdEvent={userEvents} />
            ) : (
              <div role="alert" className="alert">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="stroke-info shrink-0 w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span> No events created yet</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
