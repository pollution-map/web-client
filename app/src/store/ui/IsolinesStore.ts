import { asGeoPoints, asGeoPointsO } from 'src/models/geo-point';
import { Isolines } from 'src/models/isoline';
import { asActiveParams } from 'src/models/mode';
import { ModesStore } from 'src/store/ui/ModesStore';
import { comboisolines } from 'src/utils/isolines';
import { isolinesZ } from 'src/utils/isolinesZ';
import { CitiesStore } from './CitiesStore';

export class IsolinesStore {
  constructor(
    private modesStore: ModesStore,
    private citiesStore: CitiesStore
  ) {}

  get isolines(): Isolines {
    const modes = this.modesStore.modes;
    const result = comboisolines(
      asGeoPoints(this.citiesStore.SelectedCity?.borders),
      asGeoPointsO(this.citiesStore.SelectedCity?.measurements),
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
