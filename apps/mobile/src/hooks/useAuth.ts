import { useAuthStore } from '@manabandhu/utils/state/auth';
import { useMutation } from '@tanstack/react-query';
import { api } from '@manabandhu/utils/api/client';
import { LoginRequest, LoginResponse } from '@manabandhu/types/auth';

export const useLogin = () =>
  useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: async (payload) => {
      const { data } = await api.post('/v1/auth/login', payload);
      useAuthStore.getState().setSession(data.token, data.user);
      return data;
    }
  });

export const useLogout = () => {
  const clear = useAuthStore((s) => s.clear);
  return () => clear();
};
