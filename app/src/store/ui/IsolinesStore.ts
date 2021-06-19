import { getIzhevskBorders } from 'src/data/testdata';
import { Isolines } from 'src/models/isoline';
import { asGeoPoint } from 'src/models/measurement';
import { asActiveParams } from 'src/models/mode';
import { IMeasurementsStore } from 'src/store/data/MeasurementsStore';
import { ModesStore } from 'src/store/ui/ModesStore';
import { comboisolines } from 'src/utils/isolines';
export class IsolinesStore {
  constructor(
    private modesStore: ModesStore,
    private measurementsStore: IMeasurementsStore
  ) { }
  
  get isolines(): Isolines | null {
    const modes = this.modesStore.modes;
    const measurements = this.measurementsStore.measurements;
    const izhevskBorders = getIzhevskBorders();
    const result = comboisolines(
      izhevskBorders,
      measurements.map((m) => asGeoPoint(m)),
      asActiveParams(modes)
    );

    return result;
  }
}
