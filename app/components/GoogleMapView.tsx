'use client';

import {
  Autocomplete,
  GoogleMap,
  Marker,
  useLoadScript,
} from '@react-google-maps/api';
import React, { useRef, useState } from 'react';

type LatLng = {
  lat: number;
  lng: number;
};

export default function GoogleMapView() {
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);
  const [searchLngLat, setSearchLngLat] = useState<LatLng | null>(null);
  const [currentLocation, setCurrentLocation] = useState<LatLng | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  // Load script for google map
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: ['places'],
    language: 'en',
  });

  if (!isLoaded) return <div>Loading....</div>;

  // Default lat and lng
  const center: LatLng = { lat: 47.5162, lng: 14.5501 };

  // Handle place change on search
  const handlePlaceChange = () => {
    const place = autocompleteRef.current?.getPlace();

    if (place?.geometry && place.geometry.location) {
      setSelectedPlace(place);
      setSearchLngLat({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
      setCurrentLocation(null);
    } else {
      console.error('Invalid place object:', place);
    }
  };

  // Get current location
  const handleGetLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setSelectedPlace(null);
          setSearchLngLat(null);
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
    <>
      <div>
        <Autocomplete
          onLoad={(autocomplete) => {
            console.log('Autocomplete loaded:', autocomplete);
            autocompleteRef.current = autocomplete;
          }}
          onPlaceChanged={handlePlaceChange}
          options={{ fields: ['address_components', 'geometry', 'name'] }}
        >
          <input type="text" placeholder="Search for a location" />
        </Autocomplete>
        <button onClick={handleGetLocationClick}>Get location</button>
      </div>
      <div>
        <GoogleMap
          zoom={currentLocation || selectedPlace ? 18 : 12}
          center={currentLocation || searchLngLat || center}
          mapContainerClassName="map"
          mapContainerStyle={{ width: '80%', height: '600px', margin: 'auto' }}
        >
          {selectedPlace && <Marker position={searchLngLat as LatLng} />}
          {currentLocation && <Marker position={currentLocation} />}
        </GoogleMap>
      </div>
    </>
  );
}
