import { Feature, FeatureCollection, Point } from 'geojson';
import { featureCollection } from '@turf/helpers';
import izhevskSensors from './izhevsk.json';
import moscowSensors from './moscow.json';
import spbSensors from './spb.json';
import naberehnye from './naberehnye-chelny.json';

export const getMockSensors = (): FeatureCollection<Point> => {
  const fc = featureCollection([
    ...asFeatureCollection(izhevskSensors).features,
    ...asFeatureCollection(moscowSensors).features,
    ...asFeatureCollection(spbSensors).features,
    ...asFeatureCollection(naberehnye).features,
  ]);

  return fc;
};

// typescript doesn't read the contents of json file
// and doesn't know that the field 'type' has 'Point' in it,
// so we need to help with that
const asFeatureCollection = (
  pointFeatureCollection: any
): FeatureCollection<Point> => {
  const fc = featureCollection<Point>([
    ...pointFeatureCollection.features.map((f: Feature<Point>) => ({
      ...f,
      geometry: {
        type: 'Point' as const,
        coordinates: f.geometry.coordinates,
      },
      type: 'Feature' as const,
    })),
  ]);

  return fc;
};
