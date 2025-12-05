import { useQuery, useMutation, UseQueryOptions } from '@tanstack/react-query';
import { api } from '../api/client';
import { RoomListing } from '@manabandhu/types/room';
import { JobPosting } from '@manabandhu/types/job';
import { RideOffer } from '@manabandhu/types/ride';
import { PageResponse } from '@manabandhu/types';

const itemsOrEmpty = <T,>(page: PageResponse<T> | T[]): T[] => {
  if (Array.isArray(page)) return page;
  return page?.items ?? [];
};

export const useRoomsQuery = (options?: UseQueryOptions<RoomListing[]>) =>
  useQuery<RoomListing[]>({
    queryKey: ['rooms'],
    queryFn: async () => {
      const { data } = await api.get<PageResponse<RoomListing>>('/rooms');
      return itemsOrEmpty(data);
    },
    ...options
  });

export const useJobsQuery = (options?: UseQueryOptions<JobPosting[]>) =>
  useQuery<JobPosting[]>({
    queryKey: ['jobs'],
    queryFn: async () => {
      const { data } = await api.get<PageResponse<JobPosting>>('/jobs');
      return itemsOrEmpty(data);
    },
    ...options
  });

export const useRidesQuery = (options?: UseQueryOptions<RideOffer[]>) =>
  useQuery<RideOffer[]>({
    queryKey: ['rides'],
    queryFn: async () => {
      const { data } = await api.get<PageResponse<RideOffer>>('/rides');
      return itemsOrEmpty(data);
    },
    ...options
  });

export const useCreateRoom = () =>
  useMutation({
    mutationFn: async (payload: Partial<RoomListing>) => (await api.post('/rooms', payload)).data
  });
