import axios from 'axios';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api/v1'; 

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false,
});

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const setToken = (token: string) => {
  sessionStorage.setItem('lib_jwt_token', token);
};

const setRefreshToken = (token: string) => {
  sessionStorage.setItem('lib_refresh_token', token);
};

const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

// Interceptor request
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('lib_jwt_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor response
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          refreshSubscribers.push((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = sessionStorage.getItem('lib_refresh_token');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const { data } = await api.post(`/auth/refresh`, {
          refreshToken,
        });

        setToken(data.accessToken);
        setRefreshToken(data.refreshToken);

        onRefreshed(data.accessToken);
        isRefreshing = false;

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
