import { makeAutoObservable } from 'mobx';
import { createContext, useContext } from 'react';
import { IMeasurementsStore, MockMeasurementsStore } from './data/MeasurementsStore';
import { IsolinesStore } from './ui/IsolinesStore';
import { ModesStore } from './ui/ModesStore';

export class RootStore {
  // -- data --
  measurementsStore: IMeasurementsStore;

  // --  ui  --
  modesStore: ModesStore;
  isolinesStore: IsolinesStore;

  constructor() {
     // -- data --
    this.measurementsStore = makeAutoObservable(new MockMeasurementsStore());
    
    // --  ui  --
    this.modesStore = makeAutoObservable(new ModesStore());
    this.isolinesStore = makeAutoObservable(new IsolinesStore(this.modesStore, this.measurementsStore));
  }
}