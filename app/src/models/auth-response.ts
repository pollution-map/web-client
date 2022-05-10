import { IUser } from './user';

export interface IAuthResponse {
  message: string;
  success: string;
  accessToken: string;
  refreshToken: string;
  user: IUser;
}
