import 'leaflet/dist/leaflet.css';
import 'leafletMarkerFix';
import {
  MapContainer,
  TileLayer,
  LayersControl,
} from 'react-leaflet';
import center from 'data/izhevskcenter.json';
import IsomapContainerMock from 'components/IsomapContainerMock';

const MapPage = () => (
  <MapContainer
    style={{ height: '100vh', width: '100vw' }}
    center={center}
    zoom={13}
    scrollWheelZoom
  >
    <LayersControl position="topright">
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
      />

      <LayersControl.Overlay checked name="Polution map">
        <IsomapContainerMock tickS={10} />
      </LayersControl.Overlay>
    </LayersControl>
  </MapContainer>
);

export default MapPage;
