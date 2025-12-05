import { api } from './client';
import { Notification } from '@manabandhu/types/notifications';

export const notificationsApi = {
  list: () => api.get<Notification[]>('/notifications').then((r) => r.data),
  create: (payload: Pick<Notification, 'type' | 'payload'>) =>
    api.post<Notification>('/notifications', payload).then((r) => r.data),
  markRead: (id: string) => api.patch<Notification>(`/notifications/${id}/read`).then((r) => r.data)
};
