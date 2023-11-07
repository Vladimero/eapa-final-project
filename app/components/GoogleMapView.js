'use client';
import {
  Autocomplete,
  GoogleMap,
  Marker,
  useLoadScript,
} from '@react-google-maps/api';
import { useRef, useState } from 'react';

export default function GoogleMapView() {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [searchLngLat, setSearchLngLat] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const autocompleteRef = useRef(null);
  const [address, setAddress] = useState('');

  // load script for google map
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
    language: 'en', // Set the language to English
  });

  if (!isLoaded) return <div>Loading....</div>;

  // static lat and lng
  const center = { lat: 47.5162, lng: 14.5501 };

  // handle place change on search
  const handlePlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();

    if (place.geometry && place.geometry.location) {
      setSelectedPlace(place);
      setSearchLngLat({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
      setCurrentLocation(null);
    } else {
      console.error('Invalid place object:', place);
      // You can handle the error here, e.g., show a message to the user
    }
  };

  // get current location
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

  // on map load
  const onMapLoad = (map) => {
    const controlDiv = document.createElement('div');
    const controlUI = document.createElement('div');
    controlUI.innerHTML = 'Get Location';
    controlUI.style.backgroundColor = 'white';
    controlUI.style.color = 'black';
    controlUI.style.border = '2px solid #ccc';
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginBottom = '22px';
    controlUI.style.textAlign = 'center';
    controlUI.style.width = '100%';
    controlUI.style.padding = '8px 0';
    controlUI.addEventListener('click', handleGetLocationClick);
    controlDiv.appendChild(controlUI);

    map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(
      controlDiv,
    );
  };

  return (
    <div>
      {/* search component  */}
      <Autocomplete
        onLoad={(autocomplete) => {
          console.log('Autocomplete loaded:', autocomplete);
          autocompleteRef.current = autocomplete;
        }}
        onPlaceChanged={handlePlaceChanged}
        options={{ fields: ['address_components', 'geometry', 'name'] }}
      >
        <input type="text" placeholder="Search for a location" />
      </Autocomplete>

      {/* map component  */}
      <GoogleMap
        zoom={currentLocation || selectedPlace ? 18 : 12}
        center={currentLocation || searchLngLat || center}
        mapContainerClassName="map"
        mapContainerStyle={{ width: '80%', height: '600px', margin: 'auto' }}
        onLoad={onMapLoad}
      >
        {selectedPlace && <Marker position={searchLngLat} />}
        {currentLocation && <Marker position={currentLocation} />}
      </GoogleMap>
    </div>
  );
}
