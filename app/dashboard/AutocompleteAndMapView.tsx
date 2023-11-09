'use client';

import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import React, { useState } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

export default function AutocompleteAndMapView({
  onLocationChange,
  onSelect,
}: {
  onLocationChange: (location: {
    lat: number | null;
    lng: number | null;
  }) => void;
  onSelect: (latLng: { lat: number; lng: number }) => void;
}) {
  const [address, setAddress] = useState('');
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number | null;
    lng: number | null;
  }>({
    lat: null,
    lng: null,
  });

  // Load script for google map
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: ['places'],
    language: 'en',
  });

  if (!isLoaded) return <div>Loading....</div>;

  const handleChange = (value: string) => {
    setAddress(value);
  };

  const handleSelect = async (value: string) => {
    const results = await geocodeByAddress(value);
    if (results && results[0]) {
      const latLng = await getLatLng(results[0]);
      setAddress(value);
      setLat(latLng.lat);
      setLng(latLng.lng);
      setSelectedLocation({
        lat: latLng.lat,
        lng: latLng.lng,
      });
      onLocationChange({ lat: latLng.lat, lng: latLng.lng });
      onSelect(latLng); // Call onSelect prop to inform parent component about the selected latLng
    }
  };

  return (
    <>
      <div>
        <PlacesAutocomplete
          value={address}
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
      </div>
      <div>
        <GoogleMap
          zoom={
            selectedLocation.lat !== null && selectedLocation.lng !== null
              ? 18
              : 6
          }
          center={
            selectedLocation.lat !== null && selectedLocation.lng !== null
              ? { lat: selectedLocation.lat, lng: selectedLocation.lng }
              : { lat: 47.5162, lng: 14.5501 }
          }
          mapContainerStyle={{ width: '80%', height: '600px', margin: 'auto' }}
        >
          {selectedLocation.lat !== null && selectedLocation.lng !== null && (
            <Marker
              position={{
                lat: selectedLocation.lat,
                lng: selectedLocation.lng,
              }}
            />
          )}
        </GoogleMap>
      </div>
    </>
  );
}
