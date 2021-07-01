import { IMeasurement } from './measurement';
import explode from '@turf/explode';
import { FeatureCollection, Point, MultiPolygon } from 'geojson';
export type Latitude = number;
export type Longitude = number;

export type GeoPoint = [Latitude, Longitude];

export const asGeoPoint = (measure: IMeasurement): GeoPointO<WeightObject> => {
  return [measure.latitude, measure.longitude, measure.value];
};

export function asGeoPoints(
  features: MultiPolygon | undefined
): Array<GeoPoint> | undefined {
  return features
    ? explode(features).features.map((f) => [
        f.geometry.coordinates[0],
        f.geometry.coordinates[1],
      ])
    : undefined;
}

export type PointWeight = number;
export type GeoPointW = [Latitude, Longitude, PointWeight];

export type ParamWeight = number;
export interface WeightObject {
  [param: string]: ParamWeight;
}
export interface WeightObjectV extends WeightObject {
  value: ParamWeight;
}
export type GeoPointO<WeightObject> = [Latitude, Longitude, WeightObject];

export function asGeoPointsO(
  measurements: Array<IMeasurement> | undefined
): Array<GeoPointO<WeightObject>> | undefined {
  return measurements?.map((m) => [m.latitude, m.longitude, m.value]);
}
