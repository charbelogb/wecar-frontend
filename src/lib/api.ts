import axios from 'axios';
import { Car, Booking, User } from '@/types';
import { mockCars, mockBookings, mockUsers } from './mock-data';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('wecar_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export async function loginUser(email: string, password: string): Promise<{ user: User; token: string }> {
  try {
    const res = await apiClient.post('/auth/login', { email, password });
    return res.data;
  } catch {
    // Mock fallback
    const user = mockUsers.find((u) => u.email === email);
    if (user && password === 'password') {
      return { user, token: 'mock-jwt-token' };
    }
    throw new Error('Email ou mot de passe incorrect');
  }
}

export async function registerUser(data: {
  full_name: string;
  email: string;
  phone: string;
  password: string;
}): Promise<{ user: User; token: string }> {
  try {
    const res = await apiClient.post('/auth/register', data);
    return res.data;
  } catch {
    const newUser: User = {
      id: `user-${Date.now()}`,
      full_name: data.full_name,
      email: data.email,
      phone: data.phone,
      role: 'customer',
      created_at: new Date().toISOString(),
    };
    return { user: newUser, token: 'mock-jwt-token' };
  }
}

export async function forgotPassword(email: string): Promise<void> {
  try {
    await apiClient.post('/auth/forgot-password', { email });
  } catch {
    // Silently succeed in mock mode
  }
}

// Cars
export async function getCars(params?: {
  category?: string;
  city?: string;
  transmission?: string;
  chauffeur?: boolean;
  minPrice?: number;
  maxPrice?: number;
}): Promise<Car[]> {
  try {
    const res = await apiClient.get('/cars', { params });
    return res.data;
  } catch {
    let cars = mockCars.filter((c) => c.status === 'active');
    if (params?.category) cars = cars.filter((c) => c.category === params.category);
    if (params?.city) cars = cars.filter((c) => c.city === params.city);
    if (params?.transmission) cars = cars.filter((c) => c.transmission === params.transmission);
    if (params?.chauffeur !== undefined) cars = cars.filter((c) => c.chauffeur_available === params.chauffeur);
    if (params?.minPrice) cars = cars.filter((c) => c.price_per_day >= params.minPrice!);
    if (params?.maxPrice) cars = cars.filter((c) => c.price_per_day <= params.maxPrice!);
    return cars;
  }
}

export async function getCarBySlug(slug: string): Promise<Car | null> {
  try {
    const res = await apiClient.get(`/cars/${slug}`);
    return res.data;
  } catch {
    return mockCars.find((c) => c.slug === slug) || null;
  }
}

export async function getAllCarsAdmin(): Promise<Car[]> {
  try {
    const res = await apiClient.get('/admin/cars');
    return res.data;
  } catch {
    return mockCars;
  }
}

export async function createCar(data: Partial<Car>): Promise<Car> {
  try {
    const res = await apiClient.post('/admin/cars', data);
    return res.data;
  } catch {
    const newCar: Car = {
      id: `car-${Date.now()}`,
      slug: data.slug || `car-${Date.now()}`,
      title: data.title || '',
      brand: data.brand || '',
      model: data.model || '',
      year: data.year || new Date().getFullYear(),
      category: data.category || 'Berline',
      city: data.city || 'Cotonou',
      price_per_day: data.price_per_day || 0,
      deposit_amount: data.deposit_amount || 0,
      chauffeur_available: data.chauffeur_available || false,
      chauffeur_price_per_day: data.chauffeur_price_per_day || 0,
      transmission: data.transmission || 'automatic',
      fuel_type: data.fuel_type || 'petrol',
      seats: data.seats || 5,
      description: data.description || '',
      main_image_url: data.main_image_url || '',
      status: data.status || 'draft',
      created_at: new Date().toISOString(),
    };
    return newCar;
  }
}

export async function updateCar(id: string, data: Partial<Car>): Promise<Car> {
  try {
    const res = await apiClient.put(`/admin/cars/${id}`, data);
    return res.data;
  } catch {
    const existing = mockCars.find((c) => c.id === id);
    return { ...existing!, ...data };
  }
}

export async function deleteCar(id: string): Promise<void> {
  try {
    await apiClient.delete(`/admin/cars/${id}`);
  } catch {
    // Silently succeed in mock mode
  }
}

// Bookings
export async function getMyBookings(): Promise<Booking[]> {
  try {
    const res = await apiClient.get('/bookings/me');
    return res.data;
  } catch {
    return mockBookings.filter((b) => b.user_id === 'user-1');
  }
}

export async function getBookingById(id: string): Promise<Booking | null> {
  try {
    const res = await apiClient.get(`/bookings/${id}`);
    return res.data;
  } catch {
    return mockBookings.find((b) => b.id === id) || null;
  }
}

export async function createBooking(data: {
  car_id: string;
  start_date: string;
  end_date: string;
  pickup_location: string;
  chauffeur_selected: boolean;
  notes?: string;
}): Promise<Booking> {
  try {
    const res = await apiClient.post('/bookings', data);
    return res.data;
  } catch {
    const car = mockCars.find((c) => c.id === data.car_id);
    const start = new Date(data.start_date);
    const end = new Date(data.end_date);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const subtotal = days * (car?.price_per_day || 0);
    const chauffeurAmt = data.chauffeur_selected ? days * (car?.chauffeur_price_per_day || 0) : 0;
    const total = subtotal + chauffeurAmt;
    const newBooking: Booking = {
      id: `booking-${Date.now()}`,
      user_id: 'user-1',
      car_id: data.car_id,
      car,
      start_date: data.start_date,
      end_date: data.end_date,
      days_count: days,
      pickup_location: data.pickup_location,
      chauffeur_selected: data.chauffeur_selected,
      subtotal_amount: subtotal,
      chauffeur_amount: chauffeurAmt,
      total_amount: total,
      upfront_amount: Math.ceil(total * 0.3),
      remaining_amount: Math.ceil(total * 0.7),
      payment_status: 'pending',
      booking_status: 'pending',
      notes: data.notes,
      created_at: new Date().toISOString(),
    };
    return newBooking;
  }
}

export async function getAllBookingsAdmin(): Promise<Booking[]> {
  try {
    const res = await apiClient.get('/admin/bookings');
    return res.data;
  } catch {
    return mockBookings;
  }
}

export async function updateBookingStatus(id: string, status: Booking['booking_status']): Promise<Booking> {
  try {
    const res = await apiClient.patch(`/admin/bookings/${id}/status`, { status });
    return res.data;
  } catch {
    const booking = mockBookings.find((b) => b.id === id);
    return { ...booking!, booking_status: status };
  }
}

// Customers (admin)
export async function getAllCustomers(): Promise<User[]> {
  try {
    const res = await apiClient.get('/admin/customers');
    return res.data;
  } catch {
    return mockUsers;
  }
}

// Profile
export async function updateProfile(data: Partial<User>): Promise<User> {
  try {
    const res = await apiClient.put('/profile', data);
    return res.data;
  } catch {
    return { ...mockUsers[0], ...data };
  }
}

// Admin stats
export async function getAdminStats(): Promise<{
  total_cars: number;
  active_bookings: number;
  total_revenue: number;
  total_customers: number;
}> {
  try {
    const res = await apiClient.get('/admin/stats');
    return res.data;
  } catch {
    return {
      total_cars: mockCars.length,
      active_bookings: mockBookings.filter((b) => b.booking_status === 'confirmed').length,
      total_revenue: mockBookings.reduce((sum, b) => sum + b.total_amount, 0),
      total_customers: mockUsers.filter((u) => u.role === 'customer').length,
    };
  }
}
