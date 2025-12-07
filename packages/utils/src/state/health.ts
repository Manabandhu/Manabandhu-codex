import { create } from 'zustand';
import type { Doctor, Appointment, FitnessChallenge } from '@manabandhu/types';

interface HealthState {
  doctors: Doctor[];
  appointments: Appointment[];
  challenges: FitnessChallenge[];
  setDoctors: (doctors: Doctor[]) => void;
  setAppointments: (appointments: Appointment[]) => void;
}

export const useHealthStore = create<HealthState>((set) => ({
  doctors: [],
  appointments: [],
  challenges: [],
  setDoctors: (doctors) => set({ doctors }),
  setAppointments: (appointments) => set({ appointments })
}));
