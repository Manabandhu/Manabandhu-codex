import { useAuthStore } from '@manabandhu/utils/state/auth';
import { useMutation } from '@tanstack/react-query';
import { authApi } from '@manabandhu/utils/api/auth';
import { LoginRequest, LoginResponse, SignupRequest, OnboardingRequest } from '@manabandhu/types/auth';

export const useLogin = () =>
  useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: async (payload) => {
      const data = await authApi.login(payload);
      useAuthStore.getState().setSession(data.token, data.user, data.refreshToken);
      return data;
    }
  });

export const useSignup = () =>
  useMutation<LoginResponse, Error, SignupRequest>({
    mutationFn: async (payload) => {
      const data = await authApi.signup(payload);
      if (!data.requiresOnboarding) {
        useAuthStore.getState().setSession(data.token, data.user, data.refreshToken);
      }
      return data;
    }
  });

export const useOnboarding = () =>
  useMutation<void, Error, OnboardingRequest>({
    mutationFn: async (payload) => {
      await authApi.completeOnboarding(payload);
    }
  });

export const usePasswordReset = () =>
  useMutation<void, Error, { email: string }>({
    mutationFn: async (payload) => {
      await authApi.requestPasswordReset(payload.email);
    }
  });

export const useLogout = () => {
  const clear = useAuthStore((s) => s.clear);
  return () => clear();
};
