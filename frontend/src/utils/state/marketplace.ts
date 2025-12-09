import { create } from 'zustand';
import type { MarketplaceItem, Auction } from '@/types';

interface MarketplaceState {
  items: MarketplaceItem[];
  auctions: Auction[];
  setItems: (items: MarketplaceItem[]) => void;
  setAuctions: (auctions: Auction[]) => void;
}

export const useMarketplaceStore = create<MarketplaceState>((set) => ({
  items: [],
  auctions: [],
  setItems: (items) => set({ items }),
  setAuctions: (auctions) => set({ auctions })
}));
