import { MultiPolygon } from 'geojson';
import axios, { AxiosInstance } from 'axios';

export interface ICitiesApi {
  getCityBorders(cityName: string): Promise<MultiPolygon | undefined>;
}

export class NominatiumApi implements ICitiesApi {
  client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      url: 'https://nominatim.openstreetmap.org/search/',
    });
  }
  async getCityBorders(cityName: string) {
    const result = await this.client.get<Array<INominatiumResponce>>(
      'https://nominatim.openstreetmap.org/search/',
      {
        params: {
          q: cityName,
          polygon_geojson: 1,
          format: 'json',
        },
      }
    );
    if (result.status != 200) return;
    if (!result?.data?.length) return;
    return result.data[0].geojson;
  }
}

interface INominatiumResponce {
  display_name: string;
  lat: number;
  lon: number;
  geojson?: MultiPolygon;
}
