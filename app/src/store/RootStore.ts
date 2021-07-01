import { MapStore } from './ui/deck/MapStore';
import { makeAutoObservable } from 'mobx';
import {
  IMeasurementsStore,
  MockMeasurementsStore,
} from './data/MeasurementsStore';
import { LayersStore } from './ui/deck/LayersStore';
import { PickInfoStore } from './ui/deck/PickInfoStore';
import { IsolinesStore } from './ui/IsolinesStore';
import { ModesStore } from './ui/ModesStore';
import { RangesStore } from './ui/RangesStore';
import { CitiesStore } from './ui/CitiesStore';
import { ApiStore } from './api/ApiStore';

export class RootStore {
  // -- api --
  apiStore: ApiStore;

  // -- data --
  measurementsStore: IMeasurementsStore;

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
    this.measurementsStore = makeAutoObservable(new MockMeasurementsStore());

    // --  ui  --
    this.citiesStore = makeAutoObservable(
      new CitiesStore(this.apiStore.citiesApi)
    );
    this.rangesStore = makeAutoObservable(new RangesStore());
    this.modesStore = makeAutoObservable(new ModesStore());
    this.isolinesStore = makeAutoObservable(
      new IsolinesStore(
        this.modesStore,
        this.measurementsStore,
        this.citiesStore
      )
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
