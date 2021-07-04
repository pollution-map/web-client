import { makeAutoObservable } from 'mobx';
import { ApiStore } from './api/ApiStore';
import {
  FilteredMeasurementsStore,
  IFilteredMeasurementsStore
} from './data/FilteredMeasurementsStore';
import {
  MockMeasurementsStore
} from './data/MeasurementsStore';
import { CitiesStore } from './ui/CitiesStore';
import { LayersStore } from './ui/deck/LayersStore';
import { MapStore } from './ui/deck/MapStore';
import { PickInfoStore } from './ui/deck/PickInfoStore';
import { IsolinesStore } from './ui/IsolinesStore';
import { ModesStore } from './ui/ModesStore';
import { RangesStore } from './ui/RangesStore';

export class RootStore {
  // -- api --
  apiStore: ApiStore;

  // -- data --
  filteredMeasurementsStore: IFilteredMeasurementsStore;

  // --  ui  --
  modesStore: ModesStore;
  rangesStore: RangesStore;
  citiesStore: CitiesStore;
  isolinesStore: IsolinesStore;

  // -- Deck Gl --
  isolinePickInfoStore: PickInfoStore;
  mapStore: MapStore;
  layersStore: LayersStore;

  constructor() {
    // -- api --
    this.apiStore = makeAutoObservable(new ApiStore());

    // -- data --
    this.filteredMeasurementsStore = new FilteredMeasurementsStore(
      makeAutoObservable(new MockMeasurementsStore())
    );

    // --  ui  --
    this.citiesStore = new CitiesStore(
      this.apiStore.citiesApi,
      this.filteredMeasurementsStore
    );
    this.rangesStore = new RangesStore(this.filteredMeasurementsStore);
    this.modesStore = makeAutoObservable(new ModesStore());
    this.isolinesStore = new IsolinesStore(
      this.modesStore,
      this.filteredMeasurementsStore,
      this.citiesStore
    );

    // -- Deck Gl --
    this.isolinePickInfoStore = makeAutoObservable(new PickInfoStore());
    this.mapStore = makeAutoObservable(new MapStore());
    this.layersStore = makeAutoObservable(
      new LayersStore(
        this.isolinesStore,
        this.mapStore,
        this.isolinePickInfoStore
      )
    );
  }
}
