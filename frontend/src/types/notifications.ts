export interface Notification {
  id: string;
  userId: string;
  type: string;
  payload?: string;
  read: boolean;
  createdAt: string;
}
