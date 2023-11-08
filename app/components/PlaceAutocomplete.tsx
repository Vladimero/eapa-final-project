'use client';

import { useLoadScript } from '@react-google-maps/api';
import React, { useState } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

type LatLng = {
  lat: number;
  lng: number;
};

export default function PlaceAutocomplete() {
  const [selectedPlace, setSelectedPlace] = useState('');
  const [currentLocation, setCurrentLocation] = useState<LatLng>({
    lat: 0,
    lng: 0,
  });
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  // Load script for google map
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: ['places'],
    language: 'en',
  });

  if (!isLoaded) return <div>Loading....</div>;

  // Default lat and lng
  const center: LatLng = { lat: 0, lng: 0 };

  const handleChange = (value: string) => {
    setSelectedPlace(value);
  };

  const handleSelect = async (value: string) => {
    const results = await geocodeByAddress(value);
    if (results && results[0]) {
      const latLng = await getLatLng(results[0]);
      console.log(latLng);
      setSelectedPlace(value);
      setLat(latLng.lat);
      setLng(latLng.lng);
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

  return (
    <div>
      <PlacesAutocomplete
        value={selectedPlace}
        onChange={handleChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
              })}
            />
            <div>
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';

                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
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
      <div>
        <button onClick={handleGetLocationClick}>Get location</button>
      </div>
    </div>
  );
}
