import izhevskBorders from 'src/data/izhevsk-borders.json';
import points from 'src/data/testdata.json';
import pointsBig from 'src/data/testdata-big.json';
import { GeoPoint, GeoPointO, GeoPointW, PointWeight, WeightObject } from 'src/models/geo-point';

const geoPoints = points.features.map((f) => f.geometry.coordinates) as Array<GeoPoint>;
const getGeoPointsW = (maxValue: PointWeight): Array<GeoPointW> => geoPoints.map(
  (p) => [...p, Math.floor(Math.random() * maxValue)],
);

const geoPointsBig = pointsBig.features.map((f) => f.geometry.coordinates) as Array<GeoPoint>;
const geoPointsBigW = (maxValue: PointWeight): Array<GeoPointW> => geoPointsBig.map(
  (p) => [...p, Math.floor(Math.random() * maxValue)],
);

const getGeoPointsO = (
  maxValue: WeightObject
): Array<GeoPointO<WeightObject>> =>
  geoPoints.map((p) => [
    ...p,
    Object.fromEntries(
      Object.entries(maxValue).map(([k, v]) => [k, Math.random() * v])
    ),
  ]);

const getIzhevskBorders = () => izhevskBorders.map((p) => [...p]) as Array<GeoPoint>;

export {
  geoPoints,
  getGeoPointsW,
  geoPointsBigW,
  getGeoPointsO,
  getIzhevskBorders,
};
