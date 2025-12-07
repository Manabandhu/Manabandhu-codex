import { create } from 'zustand';
import type { AIChatMessage, AIRecommendation } from '@manabandhu/types';

interface AIState {
  chatHistory: AIChatMessage[];
  recommendations: AIRecommendation[];
  addMessage: (msg: AIChatMessage) => void;
  setRecommendations: (recs: AIRecommendation[]) => void;
}

export const useAIStore = create<AIState>((set) => ({
  chatHistory: [],
  recommendations: [],
  addMessage: (msg) => set((s) => ({ chatHistory: [...s.chatHistory, msg] })),
  setRecommendations: (recs) => set({ recommendations: recs })
}));
