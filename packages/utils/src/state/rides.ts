import { create } from 'zustand';
import { RideOffer } from '@manabandhu/types/ride';

interface RidesState {
  items: RideOffer[];
  addRide: (ride: RideOffer) => void;
  updateStatus: (id: string, status: RideOffer['status']) => void;
}

export const useRidesStore = create<RidesState>((set, get) => ({
  items: [],
  addRide: (ride) => set({ items: [...get().items, ride] }),
  updateStatus: (id, status) =>
    set({ items: get().items.map((ride) => (ride.id === id ? { ...ride, status } : ride)) })
}));
