export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  verified: boolean;
  preferences?: Record<string, string | boolean>;
  savedIds?: string[];
}
