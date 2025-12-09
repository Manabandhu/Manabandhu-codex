import { api } from './client';
import { PageResponse, RideOffer } from '@/types';

export const rideApi = {
  list: () => api.get<PageResponse<RideOffer>>('/rides').then((r) => r.data.items ?? []),
  create: (payload: Partial<RideOffer>) => api.post<RideOffer>('/rides', payload).then((r) => r.data),
  updateStatus: (id: string, status: string) =>
    api.patch<RideOffer>(`/rides/${id}/status`, undefined, { params: { status } }).then((r) => r.data)
};
