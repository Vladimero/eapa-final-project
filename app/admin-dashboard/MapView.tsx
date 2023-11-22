'use client';
import './styles.css';
import 'leaflet/dist/leaflet.css';
import { Icon, LatLngExpression } from 'leaflet';
import Image from 'next/image';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { EventsForAdmin } from '../../database/events';

type Position = {
  lat: number;
  lng: number;
};

type Props = {
  positions: Position[];
  // userId: number[];
  mapCoords: LatLngExpression;
  allEventData: EventsForAdmin[];
};

// Create custom icon
const customIcon = new Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/447/447031.png',
  iconSize: [38, 38],
});

export default function MapView(props: Props) {
  return (
    <MapContainer center={props.mapCoords} zoom={7}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup chunkedLoading>
        {props.positions.map((position, index) => {
          const eventData = props.allEventData[index];

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
                      {eventData.firstName.toUpperCase()}`s report
                    </h2>
                    <p>Noticed on: {eventData.date}</p>
                    <p>Pollution: {eventData.pollutionKind}</p>
                    <p>Region: {eventData.regionState}</p>
                    <p>Damage Estimation: {eventData.damageEstimation}</p>
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
  );
}
