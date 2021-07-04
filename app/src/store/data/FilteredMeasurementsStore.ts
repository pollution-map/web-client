import { action, computed, makeObservable, observable } from 'mobx';
import { IMeasurement } from 'src/models/measurement';
import { IMeasurementsStore } from './MeasurementsStore';

export interface IFilter<T> {
  name: string;
  predicate(measurement: T): boolean;
}

export type MeasureFilter = IFilter<IMeasurement>;

export interface IFilteredMeasurementsStore extends IMeasurementsStore {
  filters: Array<MeasureFilter>;

  addOrUpdateFilter(filter: MeasureFilter): void;

  getFilterByName(name: string): MeasureFilter | undefined;

  removeFilterByName(filterName: string): void;
  removeFilter(filter: MeasureFilter): void;
}

export class FilteredMeasurementsStore implements IFilteredMeasurementsStore {
  filters: Array<MeasureFilter> = [];

  constructor(private measurementsStore: IMeasurementsStore) {
    makeObservable(this, {
      filters: observable,
      addOrUpdateFilter: action,
      removeFilterByName: action,
      removeFilter: action,
      measurements: computed,
    });
  }

  addOrUpdateFilter(filter: MeasureFilter) {
    this.filters = [
      // remove filter if exists
      ...this.filters.filter((f) => f.name !== filter.name),
      // add it
      { ...filter },
    ];
  }

  getFilterByName(name: string) {
    return this.filters.find((f) => f.name === name);
  }

  removeFilterByName(filterName: string) {
    this.filters = [
      // remove filter if exists
      ...this.filters.filter((f) => f.name !== filterName),
    ];
  }

  removeFilter(filter: MeasureFilter) {
    this.removeFilterByName(filter.name);
  }

  get measurements(): Array<IMeasurement> {
    let result = this.measurementsStore.measurements;
    for (const f of this.filters) {
      result = result.filter((measure) => f.predicate(measure));
    }
    return result;
  }
}
