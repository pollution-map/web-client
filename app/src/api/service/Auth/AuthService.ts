import axios from 'axios';
import { AxiosResponse } from 'axios';
import { IAuthResponse } from 'src/models/auth-response';
import { IUser } from 'src/models/user';
import { api } from '../../AxiosClient';
import { IAuthService } from './IAuthService';

export class AuthService implements IAuthService {
  async login(
    password: string,
    login: string
  ): Promise<AxiosResponse<IAuthResponse>> {
    return api.post<IAuthResponse>('auth/login', { password, login });
  }

  async register(
    userName: string,
    password: string,
    email: string
  ): Promise<AxiosResponse<IAuthResponse>> {
    return api.post<IAuthResponse>('/auth/register', {
      userName,
      email,
      password,
    });
  }

  async logout(
    refreshToken: string,
    fromAllDevices: boolean
  ): Promise<undefined> {
    return api.post('/auth/logout', {
      refreshToken,
      fromAllDevices,
    });
  }

  async refresh(
    accessToken: string,
    refreshToken: string
  ): Promise<AxiosResponse<IAuthResponse>> {
    return api.post<IAuthResponse>('/auth/refresh', {
      accessToken,
      refreshToken,
    });
  }
  async me(
  ): Promise<AxiosResponse<IUser>> {
    return api.get<IUser>('/users/me');
  }
}
