import axios from 'axios';
import { getCookie } from 'src/utils/cookie';
import { IAuthResponse } from 'src/models/auth-response';

export const API_URL = process.env.REACT_APP_PMAP_URL;

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.post<IAuthResponse>(
          `${API_URL}/auth/refresh`,
          {
            accessToken: String(localStorage.getItem('token')),
            refreshToken: String(getCookie('REFRESHTOKEN')),
          }
        );
        var date = new Date();
        date.setDate(date.getDate() + 30);
        document.cookie = `REFRESHTOKEN=${
          response.data.refreshToken
        };path=/ ; expires=${date.toUTCString()}`;
        localStorage.setItem('token', response.data.accessToken);
        return api.request(originalRequest);
      } catch (e) {
        console.log('НЕ АВТОРИЗОВАН');
      }
    }
    throw error;
  }
);