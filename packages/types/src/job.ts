export interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  description: string;
  verified: boolean;
  reported?: boolean;
}
