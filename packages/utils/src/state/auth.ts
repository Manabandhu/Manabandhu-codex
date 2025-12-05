import { create } from 'zustand';
import { User } from '@manabandhu/types/user';

interface AuthState {
  user?: User;
  token?: string;
  pendingProvider?: string;
  setSession: (token: string, user: User) => void;
  clear: () => void;
  setPendingProvider: (provider?: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  setSession: (token, user) => set({ token, user, pendingProvider: undefined }),
  clear: () => set({ token: undefined, user: undefined }),
  setPendingProvider: (provider) => set({ pendingProvider: provider })
}));
