import { create } from 'zustand';
import { ImmigrationResource, ImmigrationCase } from '@manabandhu/types/immigration';

interface ImmigrationState {
  resources: ImmigrationResource[];
  cases: ImmigrationCase[];
  addResource: (resource: ImmigrationResource) => void;
  addCase: (item: ImmigrationCase) => void;
  updateCase: (id: string, updates: Partial<ImmigrationCase>) => void;
}

export const useImmigrationStore = create<ImmigrationState>((set, get) => ({
  resources: [],
  cases: [],
  addResource: (resource) => set({ resources: [...get().resources, resource] }),
  addCase: (item) => set({ cases: [...get().cases, item] }),
  updateCase: (id, updates) =>
    set({ cases: get().cases.map((c) => (c.id === id ? { ...c, ...updates } : c)) })
}));
