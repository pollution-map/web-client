import { AxiosResponse } from 'axios';
import { IMap } from 'src/models/map';
import { IResponse } from 'src/models/response';

export interface IMapService {
  maps(length?: string, offset?: string): Promise<AxiosResponse<[IMap]>>;
  mapCreate(name: string): Promise<AxiosResponse<IMap>>;
  mapId(id: string): Promise<AxiosResponse<IMap>>;
  mapUpdate(id: string, name: string): Promise<AxiosResponse<IMap>>;
  mapDelete(id: string): Promise<AxiosResponse<IResponse>>;
}
