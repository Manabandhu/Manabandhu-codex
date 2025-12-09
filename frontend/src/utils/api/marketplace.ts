import { api } from './client';
import type { MarketplaceItem, Auction } from '@/types';

export const marketplaceAPI = {
  getItems: (category?: string) => api.get<MarketplaceItem[]>('/marketplace', { params: { category } }),
  createItem: (item: Partial<MarketplaceItem>) => api.post<MarketplaceItem>('/marketplace', item),
  getAuctions: () => api.get<Auction[]>('/marketplace/auctions'),
  placeBid: (id: string, amount: number) => api.post(`/marketplace/auctions/${id}/bid`, { amount })
};
