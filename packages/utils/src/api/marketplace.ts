import { client } from './client';
import type { MarketplaceItem, Auction } from '@manabandhu/types';

export const marketplaceAPI = {
  getItems: (category?: string) => client.get<MarketplaceItem[]>('/marketplace', { params: { category } }),
  createItem: (item: Partial<MarketplaceItem>) => client.post<MarketplaceItem>('/marketplace', item),
  getAuctions: () => client.get<Auction[]>('/marketplace/auctions'),
  placeBid: (id: string, amount: number) => client.post(`/marketplace/auctions/${id}/bid`, { amount })
};
