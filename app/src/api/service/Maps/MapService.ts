import axios from 'axios';
import { AxiosResponse } from 'axios';
import { IMap } from 'src/models/map';
import { IResponse } from 'src/models/response';
import { api } from '../../AxiosClient';
import { IMapService } from './IMapService';

export class MapService implements IMapService {
  async maps(length?: string, offset?: string): Promise<AxiosResponse<[IMap]>> {
    return api.get<[IMap]>(`/maps?limit=${length}&offset=${offset}`);
  }

  async mapCreate(name: string): Promise<AxiosResponse<IMap>> {
    return api.post<IMap>('/maps', {
      name,
    });
  }

  async mapId(id: string): Promise<AxiosResponse<IMap>> {
    return api.get<IMap>(`/maps/${id}`);
  }

  async mapUpdate(id: string, name: string): Promise<AxiosResponse<IMap>> {
    return api.put<IMap>(`/maps/${id}`, {
      name,
    });
  }

  async mapDelete(id: string): Promise<AxiosResponse<IResponse>> {
    return api.delete<IResponse>(`/maps/${id}`);
  }
}
