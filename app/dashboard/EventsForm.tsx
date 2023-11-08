'use client';

import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useState } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { Pollution } from '../../migrations/00000-createPollution';
import { Region } from '../../migrations/00002-createRegion';
import GetLocationButton from '../components/GetLocationButton';

type LatLng = {
  lat: number;
  lng: number;
};

// Parse the props of pollution and region inside the parameters
export default function EventsForm(
  props: { lat: number; lng: number },
  {
    userId,
    pollutionId,
    regionId,
  }: {
    userId: number;
    pollutionId: Pollution[];
    regionId: Region[];
  },
) {
  const [report, setReport] = useState('');
  const [damageEstimation, setDamageEstimation] = useState('');
  const [date, setDate] = useState('');
  const [adminComment, setAdminComment] = useState('');
  const [pollution, setPollution] = useState('');
  const [region, setRegion] = useState('');
  const [uploadImage, setUploadImage] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState('');
  const router = useRouter();

  const [selectedPlace, setSelectedPlace] = useState<string>('');
  const [currentLocation, setCurrentLocation] = useState<LatLng>({
    lat: 0,
    lng: 0,
  });
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  // Load script for google map
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: ['places'],
    language: 'en',
  });

  if (!isLoaded) return <div>Loading....</div>;

  // Default center for the map
  const center: LatLng = { lat: props.lat, lng: props.lng };

  // Handle change in PlaceAutocomplete input
  const handleChange = (value: string) => {
    setSelectedPlace(value);
  };

  // Handle selection of an address
  const handleSelect = async (value: string) => {
    const results = await geocodeByAddress(value);
    if (results && results[0]) {
      const latLng = await getLatLng(results[0]);
      setSelectedPlace(value);
      setCurrentLocation({
        lat: latLng.lat,
        lng: latLng.lng,
      });
    }
  };

  // Handle getting the user's current location
  const handleGetLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setSelectedPlace('');
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.log(error);
        },
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
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
      <div>
        <div>
          <PlacesAutocomplete
            value={selectedPlace}
            onChange={handleChange}
            onSelect={handleSelect}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div>
                <input
                  {...getInputProps({
                    placeholder: 'Search Places ...',
                  })}
                />
                <div>
                  {loading && <div>Loading...</div>}
                  {suggestions.map((suggestion) => {
                    const style = suggestion.active
                      ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                      : { backgroundColor: '#ffffff', cursor: 'pointer' };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          style,
                        })}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>

          <GetLocationButton onClick={handleGetLocationClick} />
        </div>
        <div>
          <GoogleMap
            zoom={currentLocation.lat || selectedPlace ? 18 : 12}
            center={currentLocation || center}
            mapContainerStyle={{
              width: '80%',
              height: '600px',
              margin: 'auto',
            }}
          >
            {selectedPlace && (
              <Marker
                position={{
                  lat: Number(props.lat),
                  lng: Number(props.lng),
                }}
              />
            )}
            {currentLocation.lat && <Marker position={currentLocation} />}
          </GoogleMap>
        </div>
      </div>
    </form>
  );
}
