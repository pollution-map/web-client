import { IMapService } from './../../api/service/Maps/IMapService';
import { ICitiesApi } from 'src/api/cities/ICitiesApi';
import { IAuthService } from 'src/api/service/Auth/IAuthService';
import { NominatimApi } from 'src/api/cities/NominatimApi';
import { AuthService } from 'src/api/service/Auth/AuthService';
import { MapService } from 'src/api/service/Maps/MapService';

export class ApiStore {
  citiesApi: ICitiesApi;
  authService: IAuthService;
  mapService: IMapService
  constructor() {
    this.citiesApi = new NominatimApi()
    this.authService = new AuthService();
    this.mapService = new MapService();

  }
}
