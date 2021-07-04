import { MultiPolygon, Polygon } from "geojson";

export interface ICitiesApi {
  getCityBorders(cityName: string): Promise<MultiPolygon | Polygon | undefined>;
}
