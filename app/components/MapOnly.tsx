'use client';

import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import React, { useState } from 'react';

type LatLng = {
  lat: number;
  lng: number;
};

export default function MapOnly(props: { lat: number; lng: number }) {
  // Load script for Google Maps
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: ['places'],
    language: 'en',
  });

  if (!isLoaded) return <div>Loading....</div>;

  // Default center for the map
  const center: LatLng = { lat: props.lat, lng: props.lng };

  return (
    <div>
      <div>
        <GoogleMap
          zoom={14}
          center={center}
          mapContainerStyle={{ width: '80%', height: '600px', margin: 'auto' }}
        >
          <Marker
            position={{
              lat: Number(props.lat),
              lng: Number(props.lng),
            }}
          />
        </GoogleMap>
      </div>
    </div>
  );
}
