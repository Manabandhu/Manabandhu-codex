import axios from 'axios';
import Constants from 'expo-constants';
import { useAuthStore } from '../state/auth';

const baseURL = Constants?.expoConfig?.extra?.apiBaseUrl || process.env.API_BASE_URL || 'http://localhost:8080';

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
