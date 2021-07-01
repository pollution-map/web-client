import pointsWithinPolygon from '@turf/points-within-polygon';
import { featureCollection, point } from '@turf/helpers';
import { MultiPolygon } from 'geojson';
import { IMeasurement, measureFromFeature } from 'src/models/measurement';

export const inPolygon = (
  measurements: Array<IMeasurement>,
  polygon?: MultiPolygon
): Array<IMeasurement> => {
  const points = featureCollection(
    measurements.map((m) => point([m.latitude, m.longitude], m.value))
  );
  const pointsInPolygon = polygon
    ? pointsWithinPolygon(points, polygon).features.map(f => measureFromFeature(f))
      : [];
    
  return pointsInPolygon;
};

