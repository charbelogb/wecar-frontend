export interface User {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin';
  created_at: string;
}

export interface CarImage {
  id: string;
  car_id: string;
  image_url: string;
  position: number;
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
  pricePerDay: number;
  depositAmount: number;
  chauffeurAvailable: boolean;
  chauffeurPricePerDay: number;
  transmission: 'manual' | 'automatic';
  fuelType: 'petrol' | 'diesel' | 'electric' | 'hybrid';
  seats: number;
  description: string;
  mainImageUrl: string;
  images: string[];
  pickupZone: string;
  includedZones: string[];
  features: string[];
  rentalPolicy: string;
  cancellationPolicy: string;
  whatsappPhone: string;
  status: 'draft' | 'active' | 'unavailable' | 'archived';
  created_at: string;
}

export interface ReservationRequest {
  id: string;
  car_id?: string;
  car_slug?: string;
  car_title?: string;
  full_name: string;
  phone: string;
  email: string;
  start_date: string;
  end_date: string;
  pickup_location: string;
  with_chauffeur: boolean;
  message: string;
  status: 'new' | 'contacted' | 'confirmed' | 'cancelled';
  created_at: string;
}

export interface CustomRequest {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  start_date: string;
  end_date: string;
  city: string;
  budget: string;
  vehicle_type: string;
  with_chauffeur: boolean;
  message: string;
  status: 'new' | 'contacted' | 'confirmed' | 'cancelled';
  created_at: string;
}

// Legacy type alias for backward compat with existing booking pages
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
