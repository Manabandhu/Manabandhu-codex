import { create } from 'zustand';
import { User } from '@/types/user';

interface UserState {
  profile?: User;
  setProfile: (user: User) => void;
}

export const useUserStore = create<UserState>((set) => ({
  setProfile: (profile) => set({ profile })
}));
