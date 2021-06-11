import "leaflet/dist/leaflet.css";
import "./leafletMarkerFix";
import {
  MapContainer,
  TileLayer,
  LayersControl,
  FeatureGroup,
} from "react-leaflet";
import { useState, useEffect } from 'react';
import center from "./izhevskcenter.json";
import { geoPoints, xyzPoints } from "./testdata/testdata";
import IsoplethContainer from "./Isopleth/IsoplethContainer";
import IDWIsoplethContainer from "./Isopleth/IDWIsoplethContainer";
import GeoIsopleth from "./Isopleth/GeoIsopleth";

const centerCoords = center.features[0].geometry.coordinates.reverse();

const randowPointsData = geoPoints.map(_ => Math.floor(Math.random() * 256));

const LeafletMap = () => {
  const [pointsData, setPointsData] = useState(randowPointsData);


  // randomly change points data every 10 seconds
  useEffect(() => {
    const i = setInterval(() => {
      const randowPointsData = geoPoints.map(_ => Math.floor(Math.random() * 256));
      setPointsData(randowPointsData);
    }, 100 * 1000)
    return () => {
      clearInterval(i);
    }
  }, [])


  console.log('points', geoPoints)
  return (
    <MapContainer
      style={{ height: "100vh", width: "100vw" }}
      center={centerCoords}
      zoom={13}
      scrollWheelZoom={true}
    >
      <LayersControl position="topleft">
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* <LayersControl.Overlay name="Marker with popup">
              <LayerGroup>
                <LayerGroup>
                  {points.map((p, i) => (
                    <Marker key={i} position={p} />
                  ))}
                </LayerGroup>
                <Marker position={centerCoords}>
                  <Popup>
                    A pretty CSS3 popup.
                    <br /> Easily customizable.
                  </Popup>
                </Marker>
              </LayerGroup>
            </LayersControl.Overlay> */}

          

    
        <LayersControl.Overlay checked name="Polution map">
          <FeatureGroup>
          
            {/* <Isopleth data={resultdata} coloringFunction={color}/> */}
            {/* <IsoplethContainer points={geoPoints} pointsData={pointsData} width={90} height={90} /> */}
            {/* <IDWIsoplethContainer/> */}
            <GeoIsopleth/>
          </FeatureGroup>
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
  );
};

export default LeafletMap;
