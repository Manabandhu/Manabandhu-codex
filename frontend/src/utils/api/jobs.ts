import { api } from './client';
import { JobPosting, PageResponse } from '@/types';

export const jobApi = {
  list: () => api.get<PageResponse<JobPosting>>('/jobs').then((r) => r.data.items ?? []),
  create: (payload: Partial<JobPosting>) => api.post<JobPosting>('/jobs', payload).then((r) => r.data),
  report: (id: string) => api.post<JobPosting>(`/jobs/${id}/report`).then((r) => r.data)
};
