import { Feature, FeatureCollection, Point } from 'geojson';
import { IMeasurement } from 'src/models/measurement';
import izhevskBorders from 'src/data/izhevsk-borders.json';
import points from 'src/data/testdata.json';
import pointsBig from 'src/data/testdata-big.json';
import {
  GeoPoint,
  GeoPointO,
  GeoPointW,
  PointWeight,
  WeightObject,
} from 'src/models/geo-point';
import { randomDate } from 'src/utils/random';

const geoPoints = points.features.map(
  (f) => f.geometry.coordinates
) as Array<GeoPoint>;
const getGeoPointsW = (maxValue: PointWeight): Array<GeoPointW> =>
  geoPoints.map((p) => [...p, Math.floor(Math.random() * maxValue)]);

const geoPointsBig = pointsBig.features.map(
  (f) => f.geometry.coordinates
) as Array<GeoPoint>;
const geoPointsBigW = (maxValue: PointWeight): Array<GeoPointW> =>
  geoPointsBig.map((p) => [...p, Math.floor(Math.random() * maxValue)]);

const getGeoPointsO = (
  maxValue: WeightObject
): Array<GeoPointO<WeightObject>> =>
  geoPoints.map((p) => [
    ...p,
    Object.fromEntries(
      Object.entries(maxValue).map(([k, v]) => [k, Math.random() * v])
    ),
  ]);

export const createMockMeasurements = (
  maxValue: WeightObject,
  date: {
    minDate: Date,
    maxDate: Date
  },
  positions: FeatureCollection<Point>,
): Array<IMeasurement> => positions.features.map((f: Feature<Point>) => ({
  latitude: f.geometry.coordinates[0],
  longitude: f.geometry.coordinates[1],
  props: {
    value: Object.fromEntries(
      Object.entries(maxValue).map(([k, v]) => [k, Math.random() * v])
    ) as WeightObject,
    timestamp: randomDate(date.minDate, date.maxDate)
  },
}));

const getIzhevskBorders = () =>
  izhevskBorders.map((p) => [...p]) as Array<GeoPoint>;

export {
  geoPoints,
  getGeoPointsW,
  geoPointsBigW,
  getGeoPointsO,
  getIzhevskBorders,
};
