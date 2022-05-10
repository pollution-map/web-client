import { makeAutoObservable } from 'mobx';
import { IMap } from 'src/models/map';
import { IMapService } from '../../api/service/Maps/IMapService';

export class DatasetsStore {
  map = {} as IMap;
  mapData: Array<string> = [];
  isLoading = false;
  message = 'null';

  constructor(private mapService: IMapService) {
    makeAutoObservable(this);
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }
  setMessage(message: string) {
    this.message = message;
  }
  async getMap(id: string) {
    this.setLoading(true);
    try {
      const response = await this.mapService.mapId(id);
      this.map = response.data;
    } catch (e: any) {
      this.setMessage(e.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }
  //  ----    finish    ----
  async setFile(file: FormData) {
    this.setLoading(true);
    try {
      this.mapData.push('true'); //test
    } catch (e: any) {
      this.setMessage(e.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }
}
