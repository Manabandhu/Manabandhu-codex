import { api } from './client';
import { PageResponse, User } from '@/types';

export const userApi = {
  list: () => api.get<PageResponse<User>>('/users').then((r) => r.data.items ?? []),
  me: () => api.get<User>('/users/me').then((r) => r.data)
};
