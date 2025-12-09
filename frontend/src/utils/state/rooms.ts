import { create } from 'zustand';
import { RoomListing } from '@/types/room';

interface RoomsState {
  items: RoomListing[];
  saved: RoomListing[];
  addRoom: (room: RoomListing) => void;
  saveRoom: (id: string) => void;
}

export const useRoomsStore = create<RoomsState>((set, get) => ({
  items: [],
  saved: [],
  addRoom: (room) => set({ items: [...get().items, room] }),
  saveRoom: (id) => {
    const room = get().items.find((r) => r.id === id);
    if (room) set({ saved: [...get().saved, room] });
  }
}));
