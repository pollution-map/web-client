import { IActiveParams } from "src/utils/isolines";

export interface IMode {
  name: string;
  displayName: string;
  isActive: boolean;
}

export const asActiveParams = (modes: Array<IMode>): IActiveParams => {
    const result = {};
    for (let i = 0; i < modes.length; i++) {
        const mode = modes[i];
        Object.assign(result, Object.fromEntries([[mode.name, mode.isActive]]));
    }
    return result;
}