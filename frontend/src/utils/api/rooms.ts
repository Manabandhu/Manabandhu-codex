import { api } from './client';
import { PageResponse, RoomListing } from '@/types';

export const roomApi = {
  list: () => api.get<PageResponse<RoomListing>>('/rooms').then((r) => r.data.items ?? []),
  create: (payload: Partial<RoomListing>) => api.post<RoomListing>('/rooms', payload).then((r) => r.data)
};
