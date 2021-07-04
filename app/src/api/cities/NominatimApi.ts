import axios, { AxiosInstance } from 'axios';
import { MultiPolygon, Polygon } from 'geojson';
import { getFallbackBorders } from './fallback-cities-borders/getFallbackBorders';
import { ICitiesApi } from './ICitiesApi';

interface INominatimResponce {
  display_name: string;
  geojson?: MultiPolygon | Polygon;
  error?: string;
}

export class NominatimApi implements ICitiesApi {
  client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      url: 'https://nominatim.openstreetmap.org/search/',
    });
  }
  async getCityBorders(
    cityName: string
  ): Promise<MultiPolygon | Polygon | undefined> {
    let errorMsg = '';
    const result = await this.client
      .get<Array<INominatimResponce>>(
        'https://nominatim.openstreetmap.org/search/',
        {
          params: {
            q: cityName,
            polygon_geojson: 1,
            format: 'json',
          },
        }
      )
      .catch((err) => {
        errorMsg = err.message;
      });
    
    if (errorMsg) {
      const fallbackBorders = getFallbackBorders(cityName);
      if (fallbackBorders) return fallbackBorders;
      return;
    }
    
    if (!result?.data?.length) return;
    
    return result.data[0].geojson;
  }
}
