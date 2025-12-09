export interface AIChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface AIRecommendation {
  type: 'job' | 'room' | 'ride' | 'event';
  itemId: string;
  score: number;
  reason: string;
}

export interface VoiceSearchQuery {
  id: string;
  transcript: string;
  results: any[];
  timestamp: string;
}

export interface AstrologyReading {
  id: string;
  userId: string;
  sign: string;
  prediction: string;
  date: string;
}
