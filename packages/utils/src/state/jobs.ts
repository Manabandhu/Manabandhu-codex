import { create } from 'zustand';
import { JobPosting } from '@manabandhu/types/job';

interface JobsState {
  items: JobPosting[];
  addJob: (job: JobPosting) => void;
  report: (id: string) => void;
}

export const useJobsStore = create<JobsState>((set, get) => ({
  items: [],
  addJob: (job) => set({ items: [...get().items, job] }),
  report: (id) =>
    set({
      items: get().items.map((job) => (job.id === id ? { ...job, reported: true } : job))
    })
}));
