import { api } from './client';
import { LoginRequest, LoginResponse, User } from '@manabandhu/types';

export const authApi = {
  login: (payload: LoginRequest) => api.post<LoginResponse>('/auth/login', payload).then((r) => r.data),
  me: () => api.get<User>('/auth/me').then((r) => r.data)
};
