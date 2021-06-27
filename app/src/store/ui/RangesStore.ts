import { scaleTime } from 'd3';
import { IRange, RangeValues } from 'src/models/range';

export class RangesStore {
  ranges: Array<IRange> = [
    {
      name: 'Time',
      values: [0, 100],
      domainFn: (v) =>
        scaleTime(
          [0, 100],
          [new Date(2021, 5, 1, 3), new Date(2021, 5, 2, 3)]
        )(v)
          .toISOString()
          .substr(11, 5),
    },
    {
      name: 'Date',
      values: [0, 100],
      domainFn: (v) =>
        scaleTime(
          [0, 100],
          [new Date(2021, 5, 1), new Date()]
        )(v).toLocaleDateString('en-GB'),
    },
  ];

  setRangeValues(range: IRange, values: RangeValues) {
    const rangeIndex = this.ranges.findIndex((r) => r.name == range.name);
    if (rangeIndex == -1) return;
    this.ranges[rangeIndex].values = values;
    console.log(range.name, values);
  }
}
