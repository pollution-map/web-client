import { scaleTime } from 'd3';
import { action, autorun, computed, makeObservable, observable } from 'mobx';
import { IRange, RangeValues } from 'src/models/range';
import { IFilteredMeasurementsStore } from 'src/store/data/FilteredMeasurementsStore';

export class RangesStore {
  constructor(private filteredMeasurementsStore: IFilteredMeasurementsStore) {
    makeObservable(this, {
      ranges: observable,
      Ranges: computed,
      setRangeValues: action,
    });

    autorun(() => {
      for (const r of this.Ranges) {
        // sort to not depend on order of values in Range array.
        // basicly fix for situation when thumbs are swapped
        const [low, hight] = r.values.slice().sort((a, b) => a - b);
        const lowerBound = r.domainFn(low);
        const upperBound = r.domainFn(hight);

        // to differenciate time and date filters
        switch (r.name) {
          case 'Date': {
            this.filteredMeasurementsStore.addOrUpdateFilter({
              name: r.name,
              predicate: (measurement) =>
                lowerBound <= measurement.props.timestamp &&
                measurement.props.timestamp <= upperBound,
            });
            break;
          }
          case 'Time': {
            // for now only accounts for hours
            this.filteredMeasurementsStore.addOrUpdateFilter({
              name: r.name,
              predicate: (measurement) => {
                const lowerBoundHours = lowerBound.getHours();
                const upperBoundHours = upperBound.getHours();

                // take all measurements if bounds are on the edge (00:00 --- 00:00)
                if (
                  lowerBoundHours == upperBoundHours &&
                  lowerBoundHours == 0
                ) {
                  return true;
                }

                const measureHours = measurement.props.timestamp.getHours();

                return (
                  measureHours >= lowerBoundHours &&
                  measureHours <= upperBoundHours
                );
              },
            });
            break;
          }
        }
      }
    });
  }

  ranges: Array<IRange<Date>> = [
    {
      name: 'Time',
      values: [0.01, 100 - 0.01],
      domainFn: (v) =>
        scaleTime(
          [0, 100],
          // range of one day (24 hours)
          [new Date(2021, 5, 1, 0), new Date(2021, 5, 2, 0)]
        )(v),
      viewFn: (v) => v.toTimeString().substr(0, 5),
    },
    {
      name: 'Date',
      values: [0, 100],
      domainFn: (v) =>
        scaleTime([0, 100], [new Date(2021, 5, 1), new Date()])(v),
      viewFn: (v) => v.toLocaleDateString('en-GB'),
    },
  ];

  get Ranges() {
    return this.ranges.slice().sort((a, b) => a.name.localeCompare(b.name));
  }

  setRangeValues(range: IRange<Date>, values: RangeValues) {
    const r = this.ranges.find((r) => r.name == range.name);
    if (!r) return;

    r.values = values;
  }
}
