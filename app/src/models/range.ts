export type RangeValues = [number, number] | [number];

export interface IRange {
  name: string;
  values: RangeValues;
  domainFn: (value: number) => string;
}
