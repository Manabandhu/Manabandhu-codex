import { api } from './client';

export const socialAPI = {
  getGroups: () => api.get('/social/groups'),
  createPost: (post: { content: string; images?: string[] }) => api.post('/social/posts', post),
  getFestivals: () => api.get('/social/festivals'),
  getDesiFood: (location: string) => api.get('/social/food-delivery', { params: { location } }),
  getMatrimonyProfiles: (filters?: string) => api.get('/social/matrimony', { params: { filters } })
};
