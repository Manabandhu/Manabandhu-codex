export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  location: string;
  availability: string[];
  telemedicine: boolean;
}

export interface Appointment {
  id: string;
  doctorId: string;
  userId: string;
  date: string;
  type: 'in-person' | 'telemedicine';
  status: 'scheduled' | 'completed' | 'cancelled';
}

export interface FitnessChallenge {
  id: string;
  title: string;
  goal: string;
  participants: number;
  endDate: string;
}

export interface DietPlan {
  id: string;
  userId: string;
  meals: { name: string; calories: number; time: string }[];
  targetCalories: number;
}
