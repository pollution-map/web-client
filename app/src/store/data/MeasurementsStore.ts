import { getMockMeasurements } from 'src/data/testdata';
import { IMeasurement } from 'src/models/measurement';

export interface IMeasurementsStore {
  get measurements(): Array<IMeasurement>;
}

export class MockMeasurementsStore implements IMeasurementsStore {
  get measurements(): Array<IMeasurement> {
    return getMockMeasurements({
      polution: 123,
      noise: 70
    }, {
      minDate: new Date(2021, 5, 1),
      maxDate: new Date()
    });
  }
}
