import { AxiosResponse } from 'axios';
import { IUser } from 'src/models/user';
import { IAuthResponse } from '../../../models/auth-response';

export interface IAuthService {
  login(password: string, login: string): Promise<AxiosResponse<IAuthResponse>>;
  register(
    userName: string,
    password: string,
    email?: string
  ): Promise<AxiosResponse<IAuthResponse>>;
  refresh(
    accessToken?: string | null,
    refreshToken?: string | null
  ): Promise<AxiosResponse<IAuthResponse>>;
  logout(refreshToken?: string | null, fromAllDevices?: boolean): Promise<undefined>;
  me(): Promise<AxiosResponse<IUser>>;
}
