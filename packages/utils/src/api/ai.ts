import { client } from './client';
import type { AIChatMessage, AIRecommendation, AstrologyReading } from '@manabandhu/types';

export const aiAPI = {
  chat: (message: string) => client.post<AIChatMessage>('/ai/chat', { content: message }),
  getRecommendations: (userId: string, type: string) => client.get<AIRecommendation[]>('/ai/recommendations', { params: { userId, type } }),
  voiceSearch: (audio: Blob) => client.post('/ai/voice-search', { audio }),
  getAstrology: (userId: string) => client.get<AstrologyReading>('/ai/astrology', { params: { userId } })
};
