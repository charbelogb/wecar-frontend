export interface User {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin';
  created_at: string;
}

export interface Car {
  id: string;
  slug: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  category: string;
  city: string;
  price_per_day: number;
  deposit_amount: number;
  chauffeur_available: boolean;
  chauffeur_price_per_day: number;
  transmission: 'manual' | 'automatic';
  fuel_type: 'petrol' | 'diesel' | 'electric' | 'hybrid';
  seats: number;
  description: string;
  main_image_url: string;
  images?: CarImage[];
  status: 'draft' | 'active' | 'unavailable' | 'archived';
  created_at: string;
}

export interface CarImage {
  id: string;
  car_id: string;
  image_url: string;
  position: number;
}

export interface Booking {
  id: string;
  user_id: string;
  car_id: string;
  car?: Car;
  start_date: string;
  end_date: string;
  days_count: number;
  pickup_location: string;
  chauffeur_selected: boolean;
  subtotal_amount: number;
  chauffeur_amount: number;
  total_amount: number;
  upfront_amount: number;
  remaining_amount: number;
  payment_status: 'pending' | 'successful' | 'failed' | 'refunded';
  booking_status: 'pending' | 'paid' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
  created_at: string;
}
