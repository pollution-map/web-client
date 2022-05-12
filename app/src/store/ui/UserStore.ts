import { IUser } from 'src/models/user';
import axios from 'axios';
import { API_URL } from 'src/api/PMapApi';
import { makeAutoObservable } from 'mobx';
import { IAuthService } from 'src/api/service/Auth/IAuthService';
import { IMapService } from 'src/api/service/Maps/IMapService';
import { IMap } from 'src/models/map';
import { getCookie } from 'src/components/cookie/cookie';

export class UserStore {
  user = {} as IUser;
  isAuth = false;
  isLoading = false;
  message = 'null';
  limit = '100';
  offset = '0';

  constructor(
    private authService: IAuthService,
    private mapService: IMapService
  ) {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: IUser) {
    this.user = user;
  }
  setMap(maps: [IMap]) {
    this.user.maps = [...maps];
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }
  setMessage(message: string) {
    this.message = message;
  }
  // ----    auth    ----
  async login(login: string, password: string) {
    this.setLoading(true);
    try {
      const response = await this.authService.login(password, login);
      localStorage.setItem('token', response.data.accessToken);
      var date = new Date();
      date.setDate(date.getDate() + 30);
      document.cookie = `REFRESHTOKEN=${
        response.data.refreshToken
      };path=/; expires=${date.toUTCString()}`;
      this.setAuth(true);
      this.setMessage('login');
      this.setUser(response.data.user);
    } catch (e: any) {
      this.setMessage(e.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }

  async registration(login: string, password: string, email?: string) {
    this.setLoading(true);
    try {
      const response = await this.authService.register(login, password, email);
      this.setMessage('registration');
    } catch (e: any) {
      this.setMessage(e.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }

  async logout(fromAllDevices: boolean) {
    this.setLoading(true);
    try {
      await this.authService.logout(
        localStorage.getItem('token'),
        fromAllDevices
      );
      localStorage.removeItem('token');
      document.cookie = `REFRESHTOKEN=T; max-age=0`;
      this.setAuth(false);
      this.setUser({} as IUser);
    } catch (e: any) {
      this.setMessage(e.response?.data?.message);
    } finally {
      this.message = 'null';
      this.setLoading(false);
    }
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      const response = await this.authService.refresh(
        localStorage.getItem('token'),
        getCookie('REFRESHTOKEN')
      );
      localStorage.setItem('token', response.data.accessToken);
      var date = new Date();
      date.setDate(date.getDate() + 30);
      document.cookie = `REFRESHTOKEN=${
        response.data.refreshToken
      };path=/; expires=${date.toUTCString()}`;
      this.setAuth(true);
      this.setUser((await this.authService.me()).data);
    } catch (e: any) {
      this.setMessage(e.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }
  // ----    maps    ----
  async getMaps(length: string, offset: string) {
    this.setLoading(true);
    try {
      const response = await this.mapService.maps(length, offset);
      this.setMap(response.data);
    } catch (e: any) {
      this.setMessage(e.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }
  async createMaps(name: string) {
    this.setLoading(true);
    try {
      const response = await this.mapService.mapCreate(name);
      this.user.maps.push(response.data);
      this.setMessage('create');
    } catch (e: any) {
      this.setMessage(e.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }
  async mapUpdate(id: string, name: string) {
    this.setLoading(true);
    try {
      const response = await this.mapService.mapUpdate(id, name);
      for (let i = 0; i < this.user.maps.length; i++) {
        if (this.user.maps[i].id === id) {
          this.user.maps.splice(i, 1, response.data);
        }
      }
      this.setMessage('update');
    } catch (e: any) {
      this.setMessage(e.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }
  async mapDelete(id: string) {
    this.setLoading(true);
    try {
      const response = await this.mapService.mapDelete(id);
      this.getMaps(this.limit, this.offset);
      this.setMessage('delete');
    } catch (e: any) {
      this.setMessage(e.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }
}
