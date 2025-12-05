import { useQuery, useMutation, UseQueryOptions } from '@tanstack/react-query';
import { roomApi } from '../api/rooms';
import { jobApi } from '../api/jobs';
import { rideApi } from '../api/rides';
import { RoomListing } from '@manabandhu/types/room';
import { JobPosting } from '@manabandhu/types/job';
import { RideOffer } from '@manabandhu/types/ride';

export const useRoomsQuery = (options?: UseQueryOptions<RoomListing[]>) =>
  useQuery<RoomListing[]>({
    queryKey: ['rooms'],
    queryFn: roomApi.list,
    ...options
  });

export const useJobsQuery = (options?: UseQueryOptions<JobPosting[]>) =>
  useQuery<JobPosting[]>({
    queryKey: ['jobs'],
    queryFn: jobApi.list,
    ...options
  });

export const useRidesQuery = (options?: UseQueryOptions<RideOffer[]>) =>
  useQuery<RideOffer[]>({
    queryKey: ['rides'],
    queryFn: rideApi.list,
    ...options
  });

export const useCreateRoom = () =>
  useMutation({
    mutationFn: roomApi.create
  });
