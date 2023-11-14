'use client';

import { MarkerClusterer } from '@googlemaps/markerclusterer';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import React from 'react';
import { UserEvent } from '../../database/events';

type Props = {
  userEvents: UserEvent[];
  // positions: { lat: number; lng: number }[];
  // eventId: number[];
};

export default function MapForAllEvents(props: Props) {
  const center = { lat: 47.5162, lng: 14.5501 };

  // Load script for google map
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: ['places'],
    language: 'en',
  });

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <GoogleMap
      center={center}
      zoom={7}
      mapContainerStyle={{ width: '100%', height: '500px' }}
    >
      {props.userEvents.map((event) => (
        <Marker
          key={`marker-${event.eventId}`}
          position={{
            lat: event.latitude,
            lng: event.longitude,
          }}
        />
      ))}
    </GoogleMap>
  );
}
