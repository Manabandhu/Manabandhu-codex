import axios from 'axios';
import Constants from 'expo-constants';
import { useAuthStore } from '../state/auth';

const baseURL =
  Constants?.expoConfig?.extra?.apiBaseUrl ||
  process.env.EXPO_PUBLIC_API_BASE_URL ||
  process.env.API_BASE_URL ||
  'http://localhost:3080/api/v1';

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Unwrap the ApiResponse<T> envelope returned by the monolith backend.
api.interceptors.response.use(
  (response) => {
    const payload = response.data;
    if (payload && typeof payload === 'object' && 'data' in payload && 'success' in payload) {
      return { ...response, data: payload.data };
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Handle 401 and attempt token refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = useAuthStore.getState().refreshToken;
      
      if (refreshToken) {
        try {
          const { data } = await axios.post(`${baseURL}/auth/refresh`, { refreshToken });
          useAuthStore.getState().setSession(data.token, data.user, data.refreshToken);
          originalRequest.headers.Authorization = `Bearer ${data.token}`;
          return api(originalRequest);
        } catch (refreshError) {
          useAuthStore.getState().clear();
          return Promise.reject(refreshError);
        }
      }
    }
    
    return Promise.reject(error);
  }
);
