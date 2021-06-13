import izhevskBorders from 'data/izhevskBorders.json';
import pointsBig from './testdataBig.json';
import points from './testdata.json';

const geoPoints = points.features.map((f) => f.geometry.coordinates);
const getGeoPointsW = (maxValue) => geoPoints.map(
  (p) => [...p, Math.floor(Math.random() * maxValue)],
);

const geoPointsBig = pointsBig.features.map((f) => f.geometry.coordinates);
const geoPointsBigW = (maxValue) => geoPointsBig.map(
  (p) => [...p, Math.floor(Math.random() * maxValue)],
);

const getIzhevskBorders = () => izhevskBorders.map(
  (p) => [...p],
);

export {
  geoPoints, getGeoPointsW, geoPointsBigW, getIzhevskBorders,
};
