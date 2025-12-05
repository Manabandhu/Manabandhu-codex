import axios from 'axios';
import Constants from 'expo-constants';
import { useAuthStore } from '../state/auth';

const baseURL =
  Constants?.expoConfig?.extra?.apiBaseUrl ||
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
api.interceptors.response.use((response) => {
  const payload = response.data;
  if (payload && typeof payload === 'object' && 'data' in payload && 'success' in payload) {
    return { ...response, data: payload.data };
  }
  return response;
});
