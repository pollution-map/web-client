import { ICitiesApi } from 'src/api/cities/ICitiesApi';
import { NominatimApi } from 'src/api/cities/NominatimApi';
export class ApiStore {
  citiesApi: ICitiesApi;
  constructor() {
    this.citiesApi = new NominatimApi();
  }
}
