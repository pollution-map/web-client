import { IMap } from './map'

export interface IUser {
    id: string;
    userName: string;
    emaiConfirmed: boolean;
    maps: [IMap];
    email?: string;
}