export interface ChatMessage {
  id: string;
  roomId: string;
  senderId: string;
  content: string;
  createdAt: string;
  status?: 'sent' | 'delivered' | 'read';
}

export interface ChatRoom {
  id: string;
  name: string;
  memberIds: string[];
  isGroup: boolean;
}
