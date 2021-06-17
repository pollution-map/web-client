import 'leaflet/dist/leaflet.css';
import { LayerGroup, MapContainer, TileLayer } from 'react-leaflet';
import { IsoplethOverlayMock } from 'src/components/IsoplethOverlayMock';
import { ModesControl } from 'src/components/modes/ModesControl';
import center from 'src/data/izhevskCenter.json';
import 'src/leafletMarkerFix';

export const PolutionMap = () => (
  <MapContainer
    style={{ height: '100vh', width: '100vw' }}
    center={center}
    zoom={13}
    scrollWheelZoom
  >
    <LayerGroup>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        // https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png
        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
      />
      <IsoplethOverlayMock name="Mock" tickS={0.5} />
      <IsoplethOverlayMock name="Mock2" tickS={0.5} />
      <ModesControl />
    </LayerGroup>
  </MapContainer>
);
