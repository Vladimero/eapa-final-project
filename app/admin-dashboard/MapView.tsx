'use client';
import './styles.css';
import 'leaflet/dist/leaflet.css';
import { Icon, LatLngExpression } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { EventsForAdmin } from '../../database/events';

type Position = {
  lat: number;
  lng: number;
};

type Props = {
  positions: Position[];
  userId: number[];
  mapCoords: LatLngExpression;
  allEventData: EventsForAdmin[];
};

// create custom icon
const customIcon = new Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/447/447031.png',
  iconSize: [38, 38], // size of the icon
});

export default function MapView(props: Props) {
  return (
    <MapContainer center={props.mapCoords} zoom={7}>
      OPEN STREET MAPS TILES
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup chunkedLoading>
        {props.positions.map((position, index) => {
          const eventData = props.allEventData && props.allEventData[index]; // Access specific event data

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
                    <p>{eventData.pollutionKind}</p>
                    <p>{eventData.regionState}</p>
                    <p>{eventData.damageEstimation}</p>
                    <p>{eventData.date}</p>
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
