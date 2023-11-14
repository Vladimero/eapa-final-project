'use client';
import './styles.css';
import 'leaflet/dist/leaflet.css';
import { Icon, LatLngExpression } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { ViewAllEventsFromOneUser } from '../../../database/events';

type Position = {
  lat: number;
  lng: number;
};

type Props = {
  positions: Position[];
  userId: number[];
  mapCoords: LatLngExpression;
  allEventsFromOneUser: ViewAllEventsFromOneUser[];
};

// create custom icon
const customIcon = new Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/447/447031.png',
  iconSize: [38, 38], // size of the icon
});

export default function MapViewSingleUser(props: Props) {
  return (
    <MapContainer center={props.mapCoords} zoom={7}>
      OPEN STREET MAPS TILES
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup chunkedLoading>
        {props.positions.map((position, index) => {
          const eventData =
            props.allEventsFromOneUser && props.allEventsFromOneUser[index]; // Access specific event data

          return (
            <Marker
              key={`key-div-${index}`}
              position={position}
              icon={customIcon}
            >
              {eventData && (
                <Popup>
                  <div>
                    <h2>{eventData.firstName}`s event:</h2>
                    <p>Pollution: {eventData.pollutionKind}</p>
                    <p>Region: {eventData.regionState}</p>
                    <p>Damage Estimation: {eventData.damageEstimation}</p>
                    <p>Noticed on: {eventData.date}</p>
                    <img
                      src={eventData.secureUrl}
                      alt="no image uploaded yet"
                      width={80}
                      height={50}
                    />
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
