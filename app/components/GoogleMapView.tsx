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

// COMBINED :
/*
'use client';

import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from '@react-google-maps/api';
import React, { useState } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

type LatLng = {
  lat: number;
  lng: number;
};

export default function Combined() {
  const [address, setAddress] = useState('');
  // const [searchLngLat, setSearchLngLat] = useState<LatLng | null>(null);
  // const [currentLocation, setCurrentLocation] = useState<LatLng | null>(null);
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
  const center: LatLng = { lat, lng };

  const handleChange = (value: string) => {
    setAddress(value);
  };

  const handleSelect = async (value: string) => {
    const results = await geocodeByAddress(value);
    if (results && results[0]) {
      const latLng = await getLatLng(results[0]);
      console.log(latLng);
      setAddress(value);
      setLat(latLng.lat);
      setLng(latLng.lng);

    }
  };

  // Get current location
  /*
  const handleGetLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setSelectedPlace('');
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
        {/* <button onClick={handleGetLocationClick}>Get location</button>
      </div>
      <div>
        <GoogleMap
          zoom={address ? 18 : 12}
          center={{ lat, lng }} // Use lat and lng from state
          mapContainerStyle={{ width: '80%', height: '600px', margin: 'auto' }}
        >
          {address && (
            <Marker
              position={{ lat, lng }} // Use lat and lng from state
              onClick={() => setInfoWindowOpen(true)}
            />
          )}

        </GoogleMap>
      </div>
    </>
  );
}
*/

// PLACEAUTOCOMPLETE :
/*
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
*/
