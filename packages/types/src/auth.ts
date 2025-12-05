import { User } from './user';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface OAuthProviderPayload {
  provider: 'google' | 'apple' | 'instagram' | 'otp';
  idToken?: string;
  accessToken?: string;
  otp?: string;
}
