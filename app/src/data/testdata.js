import markers from './testdata.json';

const geoPoints = markers.features.map((f) => f.geometry.coordinates.reverse());
const getGeoPointsW = () => geoPoints.map(
  ([lat, lon]) => [lon, lat, Math.floor(Math.random() * 256)],
);

// https://stackoverflow.com/questions/1185408/converting-from-longitude-latitude-to-cartesian-coordinates
// earh radius for conversion
const R = 6357;
const xyzPoints = geoPoints.map(([lon, lat]) => [
  R * Math.cos(lat) * Math.cos(lon), // x
  R * Math.cos(lat) * Math.sin(lon), // y
]);

export { geoPoints, getGeoPointsW, xyzPoints };
