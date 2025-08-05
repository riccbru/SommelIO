import config from './config';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const axiosClient = axios.create({
  baseURL: `http://${config.HOSTNAME}:${config.PORT}/api/v1`
});

let isRefreshing = false;
let failedQueue: {
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
}[] = [];
let onTokenRefresh: ((newToken: string) => void) | null = null;
let onForceLogout: (() => void) | null = null;

export const setCallback = (
  refreshCallback: (newToken: string) => void,
  logoutCallback: () => void
) => {
  onTokenRefresh = refreshCallback;
  onForceLogout = logoutCallback;
};

let currentAccessToken: string | null = null;

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  
  failedQueue = [];
};

export const updateCachedToken = (token: string | null) => {
  currentAccessToken = token;
};

const getCurrentToken = async (): Promise<string | null> => {
  if (currentAccessToken) {
    return currentAccessToken;
  }
  const token = await SecureStore.getItemAsync('accessToken');
  currentAccessToken = token;
  return token;
};

axiosClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const accessToken = await getCurrentToken();
    
    if (accessToken && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          return axiosClient(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = await SecureStore.getItemAsync('refreshToken');
        
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const response = await axios.post(`http://${config.HOSTNAME}:${config.PORT}/api/v1/auth/refresh`, null);

        const newAccessToken = response.data.token;
        
        await SecureStore.setItemAsync('accessToken', newAccessToken);
        
        currentAccessToken = newAccessToken;

        if (onTokenRefresh) {
          onTokenRefresh(newAccessToken);
        }
        
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }
        
        processQueue(null, newAccessToken);
        
        return axiosClient(originalRequest);
        
      } catch (refreshError: any) {
        processQueue(refreshError, null);
        
        await SecureStore.deleteItemAsync('accessToken');
        await SecureStore.deleteItemAsync('refreshToken');
        
        currentAccessToken = null;

        if (onForceLogout) {
          onForceLogout();
        }
        
        router.replace('/login');
        
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosClient;