import { getMockSensors } from 'src/data/mock-sensor-positions/getMockSensors';
import { createMockMeasurements } from 'src/data/testdata';
import { IMeasurement } from 'src/models/measurement';

export interface IMeasurementsStore {
  get measurements(): Array<IMeasurement>;
}

export class MockMeasurementsStore implements IMeasurementsStore {
  get measurements(): Array<IMeasurement> {
    return createMockMeasurements({
      polution: 123,
      noise: 70,
    }, {
      minDate: new Date(2021, 5, 1),
      maxDate: new Date()
    },
    getMockSensors());
  }
}
