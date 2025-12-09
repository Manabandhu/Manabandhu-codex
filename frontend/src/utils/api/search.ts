import { api } from './client';
import { SearchResult } from '@/types/search';

export const searchApi = {
  search: (query: string) => api.get<SearchResult[]>('/search', { params: { q: query } }).then((r) => r.data)
};
