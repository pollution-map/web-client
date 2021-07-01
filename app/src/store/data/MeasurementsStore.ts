import { getGeoPointsO } from 'src/data/testdata';
import { measureFromGeoPoint, IMeasurement } from 'src/models/measurement';

export interface IMeasurementsStore {
  get measurements(): Array<IMeasurement>;
}

export class MockMeasurementsStore implements IMeasurementsStore {
  get measurements(): Array<IMeasurement> {
    return getGeoPointsO({
      polution: 123,
      noise: 70,
    }).map((gp) => measureFromGeoPoint(gp));
  }
}
