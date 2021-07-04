import { point } from '@turf/helpers';
import { Feature, Point } from 'geojson';
import { Latitude, Longitude, WeightObject } from 'src/models/geo-point';

export interface IMeasurementProps {
  timestamp: Date;
  value: WeightObject;
}

export interface IMeasurement {
  latitude: Latitude;
  longitude: Longitude;
  props: IMeasurementProps;
}

export function measureToPoint(
  measure: IMeasurement
): Feature<Point, IMeasurementProps> {
  return point([measure.latitude, measure.longitude], measure.props);
}

export function measureFromPoint(
  feature: Feature<Point, IMeasurementProps>
): IMeasurement {
  return {
    latitude: feature.geometry.coordinates[0],
    longitude: feature.geometry.coordinates[1],
    props: {
      value: feature.properties.value,
      timestamp: feature.properties.timestamp,
    },
  };
}
