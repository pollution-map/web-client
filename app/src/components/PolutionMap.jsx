import center from 'data/izhevskCenter.json';
import 'leaflet/dist/leaflet.css';
import 'leafletMarkerFix';
import { LayersControl, MapContainer, TileLayer } from 'react-leaflet';
import { IsoplethOverlayMock } from './IsoplethOverlayMock';

export const PolutionMap = () => (
  <MapContainer
    style={{ height: '100vh', width: '100vw' }}
    center={center}
    zoom={13}
    scrollWheelZoom
  >
    <LayersControl position="topright">
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        // https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png
        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
      />
      <IsoplethOverlayMock checked name="Mock" tickS={0.5} />
      <IsoplethOverlayMock checked name="Mock2" tickS={0.5} />
    </LayersControl>
  </MapContainer>
);
