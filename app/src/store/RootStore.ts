import { makeAutoObservable } from 'mobx';
import {
  IMeasurementsStore,
  MockMeasurementsStore,
} from './data/MeasurementsStore';
import { DeckLayersStore } from './ui/DecklayersStore';
import { IsolinePickInfoStore } from './ui/IsolinePickInfoStore';
import { IsolinesStore } from './ui/IsolinesStore';
import { ModesStore } from './ui/ModesStore';

export class RootStore {
  // -- data --
  measurementsStore: IMeasurementsStore;

  // --  ui  --
  modesStore: ModesStore;
  isolinesStore: IsolinesStore;

  // -- Deck Gl --
  isolinePickInfoStore: IsolinePickInfoStore;
  deckLayersStore: DeckLayersStore;

  constructor() {
    // -- data --
    this.measurementsStore = makeAutoObservable(new MockMeasurementsStore());

    // --  ui  --
    this.modesStore = makeAutoObservable(new ModesStore());
    this.isolinesStore = makeAutoObservable(
      new IsolinesStore(this.modesStore, this.measurementsStore)
    );

    // -- Deck Gl --
    this.isolinePickInfoStore = makeAutoObservable(new IsolinePickInfoStore());
    this.deckLayersStore = makeAutoObservable(
      new DeckLayersStore(this.isolinesStore, this.isolinePickInfoStore)
    );
  }
}
