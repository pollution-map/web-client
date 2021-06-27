export type Latitude = number;
export type Longitude = number;

export type GeoPoint = [Latitude, Longitude];

export type PointWeight = number;
export type GeoPointW = [Latitude, Longitude, PointWeight];

export type ParamWeight = number;
export interface WeightObject {
  [param: string]: ParamWeight;
}
export interface WeightObjectV extends WeightObject {
  value: ParamWeight;
}
export type GeoPointO<WeightObject> = [Latitude, Longitude, WeightObject];
