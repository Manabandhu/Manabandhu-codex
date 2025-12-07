import { client } from './client';
import type { Doctor, Appointment, FitnessChallenge, DietPlan } from '@manabandhu/types';

export const healthAPI = {
  searchDoctors: (specialty?: string) => client.get<Doctor[]>('/health/doctors', { params: { specialty } }),
  bookAppointment: (data: Partial<Appointment>) => client.post<Appointment>('/health/appointments', data),
  getChallenges: () => client.get<FitnessChallenge[]>('/health/fitness/challenges'),
  getDietPlan: (userId: string) => client.get<DietPlan>('/health/diet/plan', { params: { userId } })
};
