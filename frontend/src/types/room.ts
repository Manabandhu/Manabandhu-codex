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
  verified?: boolean;
  roommatePreferences?: RoommatePreferences;
  splitExpenses?: ExpenseSplit[];
}

export interface RoommatePreferences {
  gender?: 'male' | 'female' | 'any';
  ageRange?: { min: number; max: number };
  occupation?: string;
  lifestyle?: string[];
  matchScore?: number;
}

export interface ExpenseSplit {
  id: string;
  category: string;
  amount: number;
  splitBetween: string[];
  perPerson: number;
}
