import { api } from './client';
import { ChatMessage } from '@manabandhu/types/chat';

export const chatApi = {
  messages: (roomId: string) => api.get<ChatMessage[]>(`/chat/rooms/${roomId}`).then((r) => r.data),
  send: (roomId: string, payload: Pick<ChatMessage, 'content'>) =>
    api.post<ChatMessage>(`/chat/rooms/${roomId}`, payload).then((r) => r.data)
};
