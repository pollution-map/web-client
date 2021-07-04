export type RangeValues = [number, number];

type DomainFn<T> = (value: number) => T;
type ViewFn<T> = (value: T) => string;

export interface IRange<T> {
  name: string;
  values: RangeValues;
  domainFn: DomainFn<T>;
  viewFn: ViewFn<T>;
}
