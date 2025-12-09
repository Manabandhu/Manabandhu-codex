import { create } from 'zustand';
import { CommunityRoom } from '@/types/community';
import { EventItem } from '@/types/event';

interface CommunityState {
  rooms: CommunityRoom[];
  events: EventItem[];
  addRoom: (room: CommunityRoom) => void;
  addEvent: (event: EventItem) => void;
}

export const useCommunityStore = create<CommunityState>((set, get) => ({
  rooms: [],
  events: [],
  addRoom: (room) => set({ rooms: [...get().rooms, room] }),
  addEvent: (event) => set({ events: [...get().events, event] })
}));
