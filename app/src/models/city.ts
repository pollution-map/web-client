import { MultiPolygon, Polygon } from 'geojson';

export interface City {
  name: string;
  isSelected: boolean;
  longitude?: number;
  latitude?: number;
  borders?: MultiPolygon | Polygon;
}
