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

export class RootStore {
  // -- data --
  measurementsStore: IMeasurementsStore;

  // --  ui  --
  modesStore: ModesStore;
  isolinesStore: IsolinesStore;

  // -- Deck Gl --
  isolinePickInfoStore: PickInfoStore;
  mapStore: MapStore;
  layersStore: LayersStore;

  constructor() {
    // -- data --
    this.measurementsStore = makeAutoObservable(new MockMeasurementsStore());

    // --  ui  --
    this.modesStore = makeAutoObservable(new ModesStore());
    this.isolinesStore = makeAutoObservable(
      new IsolinesStore(this.modesStore, this.measurementsStore)
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
