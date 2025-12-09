import { User } from './user';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  fullName: string;
  email: string;
  phone?: string;
  password: string;
}

export interface OnboardingRequest {
  fullName?: string;
  country: string;
  city?: string;
  purposes: string[];
  bio?: string;
  dateOfBirth?: string;
  gender?: string;
}

export interface LoginResponse {
  token: string;
  refreshToken?: string;
  user: User;
  requiresOnboarding?: boolean;
}

export interface OAuthProviderPayload {
  provider: 'google' | 'apple' | 'facebook' | 'phone';
  idToken?: string;
  accessToken?: string;
  otp?: string;
}
