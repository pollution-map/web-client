import { computed, makeObservable, toJS } from 'mobx';
import { asGeoPoints, asGeoPointsO } from 'src/models/geo-point';
import { Isolines } from 'src/models/isoline';
import { asActiveParams } from 'src/models/mode';
import { IMeasurementsStore } from 'src/store/data/MeasurementsStore';
import { ModesStore } from 'src/store/ui/ModesStore';
import { comboisolines } from 'src/utils/isolines';
import { isolinesZ } from 'src/utils/isolinesZ';
import { CitiesStore } from './CitiesStore';

export class IsolinesStore {
  constructor(
    private modesStore: ModesStore,
    private measurementsStore: IMeasurementsStore,
    private citiesStore: CitiesStore
  ) {
    makeObservable(this, {
      isolines: computed,
      isolinesZ: computed,
    });
  }

  get isolines(): Isolines {
    const borders = toJS(this.citiesStore.SelectedCity?.borders);
    const measurements = toJS(this.measurementsStore.measurements);

    const modes = this.modesStore.modes;
    const result = comboisolines(
      asGeoPoints(borders),
      asGeoPointsO(measurements),
      asActiveParams(modes),
      2,
      (isolines) => isolines.thresholds(40)
    );

    return result;
  }

  get isolinesZ(): Isolines {
    const result = isolinesZ(this.isolines);
    return result;
  }
}
