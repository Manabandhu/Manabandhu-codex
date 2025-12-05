import { useQuery, useMutation, UseQueryOptions } from '@tanstack/react-query';
import { api } from '../api/client';
import { RoomListing } from '@manabandhu/types/room';
import { JobPosting } from '@manabandhu/types/job';
import { RideOffer } from '@manabandhu/types/ride';

export const useRoomsQuery = (options?: UseQueryOptions<RoomListing[]>) =>
  useQuery<RoomListing[]>({
    queryKey: ['rooms'],
    queryFn: async () => (await api.get('/v1/rooms')).data,
    ...options
  });

export const useJobsQuery = (options?: UseQueryOptions<JobPosting[]>) =>
  useQuery<JobPosting[]>({
    queryKey: ['jobs'],
    queryFn: async () => (await api.get('/v1/jobs')).data,
    ...options
  });

export const useRidesQuery = (options?: UseQueryOptions<RideOffer[]>) =>
  useQuery<RideOffer[]>({
    queryKey: ['rides'],
    queryFn: async () => (await api.get('/v1/rides')).data,
    ...options
  });

export const useCreateRoom = () =>
  useMutation({
    mutationFn: async (payload: Partial<RoomListing>) => (await api.post('/v1/rooms', payload)).data
  });
