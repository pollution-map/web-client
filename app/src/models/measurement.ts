import { Feature, Point } from 'geojson';
import {
  GeoPointO,
  Latitude,
  Longitude,
  WeightObject,
} from 'src/models/geo-point';

export interface IMeasurement {
  latitude: Latitude;
  longitude: Longitude;
  value: WeightObject;
}

export function measureFromGeoPoint(geoPointO: GeoPointO<WeightObject>): IMeasurement {
  return {
    latitude: geoPointO[0],
    longitude: geoPointO[1],
    value: geoPointO[2],
  }
}
export function measureFromFeature(feature: Feature<Point, WeightObject>): IMeasurement {
  return {
    latitude: feature.geometry.coordinates[0],
    longitude: feature.geometry.coordinates[1],
    value: feature.properties,
  }
}