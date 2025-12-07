export interface ImmigrationResource {
  id: string;
  title: string;
  link: string;
  category: string;
}

export interface ImmigrationCase {
  id: string;
  question: string;
  status: 'open' | 'responded' | 'closed';
  response?: string;
}

export interface VisaStatus {
  id: string;
  userId: string;
  visaType: string;
  applicationNumber: string;
  status: 'pending' | 'approved' | 'rejected' | 'interview_scheduled';
  lastUpdated: string;
  timeline: StatusUpdate[];
}

export interface StatusUpdate {
  date: string;
  status: string;
  description: string;
}

export interface Lawyer {
  id: string;
  name: string;
  specialty: string[];
  rating: number;
  experience: number;
  availability: string[];
  consultationFee: number;
}

export interface DocumentTemplate {
  id: string;
  name: string;
  category: string;
  downloadUrl: string;
  description: string;
}

export interface VisaNews {
  id: string;
  title: string;
  summary: string;
  publishedDate: string;
  source: string;
}
