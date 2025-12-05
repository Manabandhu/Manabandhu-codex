export interface RideOffer {
  id: string;
  route: string;
  time: string;
  seats: number;
  notes?: string;
  driverId?: string;
  status?: 'open' | 'in_progress' | 'complete';
}
