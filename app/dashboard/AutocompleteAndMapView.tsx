'use client';

import './styles.css';
import 'leaflet/dist/leaflet.css';
import { useLoadScript } from '@react-google-maps/api';
import { Icon, LatLngExpression } from 'leaflet';
import Image from 'next/image';
import React, { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { UserEvent } from '../../database/events';

export type Position = {
  lat: number;
  lng: number;
};

export default function AutocompleteAndMapView({
  onLocationChange, // Lifting states up into parent comp
  onSelect, // Lifting states up into parent comp
  positions, // props from parent component
  eventId, // props from parent component
  mapCoords, // props from parent component
  userEvents, // props from parent component
  mapsKey,
}: {
  onLocationChange: (location: {
    lat: number | null;
    lng: number | null;
  }) => void;
  onSelect: (latLng: { lat: number; lng: number }) => void;
  positions: Position[];
  eventId: number[];
  mapCoords: LatLngExpression;
  userEvents: UserEvent[];
  mapsKey: string | undefined;
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

 // Load script for react place autocomplete
 const { isLoaded } = useLoadScript({
  googleMapsApiKey: mapsKey || '',
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
      onSelect(latLng); // Lift onSelect props up to inform parent component about the selected latLng
    }
  };

  // Create custom icon
  const customIcon = new Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/447/447031.png',
    iconSize: [38, 38],
  });

  return (
    <>
      <div className="absolute w-120 bg-grey rounded-md top-4 left-1/2 transform -translate-x-1/2 shadow-lg z-10">
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
                id="placeSuggestion"
                className="w-full rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-customOrange focus:border-transparent"
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
                    // eslint-disable-next-line react/jsx-key
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
      <div className="relative">
        <div className="h-96 w-full border-2 rounded-lg relative z-0">
          <MapContainer
            center={
              selectedLocation.lat !== null && selectedLocation.lng !== null
                ? { lat: selectedLocation.lat, lng: selectedLocation.lng }
                : { lat: 47.5162, lng: 14.5501 }
            }
            zoom={
              selectedLocation.lat !== null && selectedLocation.lng !== null
                ? 18
                : 6
            }
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* Place autocomplete marker */}
            {selectedLocation.lat !== null && selectedLocation.lng !== null && (
              <Marker
                position={{
                  lat: selectedLocation.lat,
                  lng: selectedLocation.lng,
                }}
                icon={customIcon}
              />
            )}
            <MarkerClusterGroup chunkedLoading>
              {positions.map((position, index) => {
                const eventData = userEvents[index];
                const key = eventData
                  ? `key-div-${eventData.date}`
                  : `key-div-${index}`;

                return (
                  <Marker
                    key={`key-div-${key}`}
                    position={position}
                    icon={customIcon}
                  >
                    {eventData && (
                      <Popup>
                        <div>
                          <h2 className="font-bold">
                            Noticed on: {eventData.date}
                          </h2>
                          <p>Pollution: {eventData.pollutionKind}</p>
                          <p>Region: {eventData.regionState}</p>
                          <p>Damage Estimation: {eventData.damageEstimation}</p>
                          <p>Report: {eventData.report}</p>
                          <div className="flex justify-center">
                            <Image
                              src={eventData.secureUrl}
                              alt="no image uploaded yet"
                              width={80}
                              height={50}
                              className="rounded w-full"
                            />
                          </div>
                        </div>
                      </Popup>
                    )}
                  </Marker>
                );
              })}
            </MarkerClusterGroup>
          </MapContainer>
        </div>
      </div>
    </>
  );
}
