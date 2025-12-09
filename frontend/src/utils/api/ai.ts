import { api } from './client';
import type { AIChatMessage, AIRecommendation, AstrologyReading } from '@/types';

export const aiAPI = {
  chat: (message: string) => api.post<AIChatMessage>('/ai/chat', { content: message }),
  getRecommendations: (userId: string, type: string) => api.get<AIRecommendation[]>('/ai/recommendations', { params: { userId, type } }),
  voiceSearch: (audio: Blob) => api.post('/ai/voice-search', { audio }),
  getAstrology: (userId: string) => api.get<AstrologyReading>('/ai/astrology', { params: { userId } })
};
