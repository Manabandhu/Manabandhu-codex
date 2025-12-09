import { api } from './client';
import type { Doctor, Appointment, FitnessChallenge, DietPlan } from '@/types';

export const healthAPI = {
  searchDoctors: (specialty?: string) => api.get<Doctor[]>('/health/doctors', { params: { specialty } }),
  bookAppointment: (data: Partial<Appointment>) => api.post<Appointment>('/health/appointments', data),
  getChallenges: () => api.get<FitnessChallenge[]>('/health/fitness/challenges'),
  getDietPlan: (userId: string) => api.get<DietPlan>('/health/diet/plan', { params: { userId } })
};
