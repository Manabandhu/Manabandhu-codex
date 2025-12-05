export interface RoomListing {
  id: string;
  title: string;
  price: number;
  location: string;
  amenities: string[];
  description?: string;
  images?: string[];
  coordinates?: { lat: number; lng: number };
  saved?: boolean;
}
