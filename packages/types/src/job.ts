export interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  description: string;
  verified: boolean;
  reported?: boolean;
  skills?: string[];
  matchScore?: number;
  referralAvailable?: boolean;
}

export interface Resume {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  phone: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
  generatedBy: 'ai' | 'manual';
}

export interface Experience {
  company: string;
  position: string;
  duration: string;
  description: string;
}

export interface Education {
  institution: string;
  degree: string;
  year: string;
}

export interface MockInterview {
  id: string;
  userId: string;
  questions: InterviewQuestion[];
  score: number;
  feedback: string;
}

export interface InterviewQuestion {
  question: string;
  userAnswer: string;
  aiScore: number;
  aiSuggestion: string;
}
