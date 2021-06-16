declare module 'geo-points' {
  export type Latitude = number;
  export type Longitude = number;

  export type GeoPoint = [Latitude, Longitude];

  export type PointWeight = number;
  export type GeoPointW = [Latitude, Longitude, PointWeight];
  export type GeoPointW<V> = [Latitude, Longitude, V];
}
