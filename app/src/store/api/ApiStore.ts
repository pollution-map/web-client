import { ICitiesApi, NominatiumApi } from 'src/api/CitiesApi';

export class ApiStore {
  citiesApi: ICitiesApi;
  constructor() {
    this.citiesApi = new NominatiumApi();
  }
}
