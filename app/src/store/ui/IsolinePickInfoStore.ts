import { Isoline } from 'src/models/isoline';
import { PickInfo } from 'deck.gl';

type IsolinePickInfo = PickInfo<Isoline> | null;

export class IsolinePickInfoStore {
  _pickInfo: IsolinePickInfo = null;

  get PickInfo(): IsolinePickInfo {
    return this._pickInfo;
  }

  set PickInfo(info: IsolinePickInfo) {
    this._pickInfo = info;
  }
}
