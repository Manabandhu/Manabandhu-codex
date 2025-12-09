export interface RideOffer {
  id: string;
  route: string;
  time: string;
  seats: number;
  notes?: string;
  driverId?: string;
  status?: 'open' | 'in_progress' | 'complete';
  costPerPerson?: number;
  totalCost?: number;
  routePreview?: RoutePreview;
}

export interface RoutePreview {
  distance: string;
  duration: string;
  waypoints: Waypoint[];
  mapUrl?: string;
}

export interface Waypoint {
  location: string;
  coordinates: { lat: number; lng: number };
}

export interface CostSplit {
  totalCost: number;
  passengers: number;
  perPerson: number;
  breakdown: { category: string; amount: number }[];
}

export interface TripPlan {
  id: string;
  userId: string;
  destinations: string[];
  startDate: string;
  endDate: string;
  rides: RideOffer[];
  visaTemplates?: string[];
}
