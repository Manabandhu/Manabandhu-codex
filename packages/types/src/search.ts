export interface SearchResult {
  type: 'room' | 'job' | string;
  id: string;
  title: string;
  description?: string;
}
