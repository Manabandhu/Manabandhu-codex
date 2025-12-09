import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@manabandhu/types/user';

interface AuthState {
  user?: User;
  token?: string;
  refreshToken?: string;
  pendingProvider?: string;
  setSession: (token: string, user: User, refreshToken?: string) => void;
  clear: () => void;
  setPendingProvider: (provider?: string) => void;
}

export const useAuthStore = create<AuthState>()(persist(
  (set) => ({
    setSession: (token, user, refreshToken) => set({ token, user, refreshToken, pendingProvider: undefined }),
    clear: () => set({ token: undefined, user: undefined, refreshToken: undefined }),
    setPendingProvider: (provider) => set({ pendingProvider: provider })
  }),
  {
    name: 'auth-storage',
    storage: createJSONStorage(() => AsyncStorage)
  }
));
