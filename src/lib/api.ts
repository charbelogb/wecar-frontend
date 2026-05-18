import { Car } from '@/types';
import { mockCars } from './mock-data';

// Cars (local mock — no backend required for MVP)
export async function getCars(params?: {
  category?: string;
  city?: string;
  transmission?: string;
  chauffeur?: boolean;
  minPrice?: number;
  maxPrice?: number;
}): Promise<Car[]> {
  let cars = mockCars.filter((c) => c.status === 'active');
  if (params?.category) cars = cars.filter((c) => c.category === params.category);
  if (params?.city) cars = cars.filter((c) => c.city === params.city);
  if (params?.transmission) cars = cars.filter((c) => c.transmission === params.transmission);
  if (params?.chauffeur !== undefined) cars = cars.filter((c) => c.chauffeurAvailable === params.chauffeur);
  if (params?.minPrice) cars = cars.filter((c) => c.pricePerDay >= params.minPrice!);
  if (params?.maxPrice) cars = cars.filter((c) => c.pricePerDay <= params.maxPrice!);
  return cars;
}

export async function getCarBySlug(slug: string): Promise<Car | null> {
  return mockCars.find((c) => c.slug === slug) || null;
}

export function getSimilarCars(car: Car, count = 3): Car[] {
  return mockCars
    .filter((c) => c.status === 'active' && c.id !== car.id && c.category === car.category)
    .slice(0, count);
}
