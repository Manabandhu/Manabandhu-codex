import { api } from './client';
import { LoginRequest, LoginResponse, SignupRequest, OnboardingRequest, User } from '@manabandhu/types';

export const authApi = {
  login: (payload: LoginRequest) => api.post<LoginResponse>('/auth/login', payload).then((r) => r.data),
  signup: (payload: SignupRequest) => api.post<LoginResponse>('/auth/signup', payload).then((r) => r.data),
  completeOnboarding: (payload: OnboardingRequest) => api.post<void>('/auth/onboarding', payload).then((r) => r.data),
  requestPasswordReset: (email: string) => api.post<void>('/auth/password-reset/request', { email }).then((r) => r.data),
  me: () => api.get<User>('/auth/me').then((r) => r.data)
};
