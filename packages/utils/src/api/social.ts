import { client } from './client';

export const socialAPI = {
  getGroups: () => client.get('/social/groups'),
  createPost: (post: { content: string; images?: string[] }) => client.post('/social/posts', post),
  getFestivals: () => client.get('/social/festivals'),
  getDesiFood: (location: string) => client.get('/social/food-delivery', { params: { location } }),
  getMatrimonyProfiles: (filters?: string) => client.get('/social/matrimony', { params: { filters } })
};
