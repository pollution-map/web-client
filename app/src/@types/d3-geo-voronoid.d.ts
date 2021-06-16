declare module 'd3-geo-voronoi' {
  import { GeoPoint, GeoPointW } from 'geo-points';
  import { MultiPolygon } from 'geojson';

  interface MultiPolygonW extends MultiPolygon {
    value: PointWeight;
  }

  interface ContourFN {
    (data: Array<GeoPoint | GeoPointW>): Array<MultiPolygonW>;
    tresholds: (count: number) => ContourFN;
  }

  export function geoContour(): ContourFN;
}