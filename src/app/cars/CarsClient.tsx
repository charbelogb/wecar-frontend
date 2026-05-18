'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Car } from '@/types';
import { getCars } from '@/lib/api';
import CarCard from '@/components/cars/CarCard';
import CarFilters from '@/components/cars/CarFilters';
import { Skeleton } from '@/components/ui/skeleton';

interface FiltersState {
  category: string;
  city: string;
  transmission: string;
  chauffeur: string;
  maxPrice: string;
}

export default function CarsClient() {
  const searchParams = useSearchParams();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FiltersState>({
    category: searchParams.get('category') || 'all',
    city: searchParams.get('city') || 'all',
    transmission: searchParams.get('transmission') || 'all',
    chauffeur: 'all',
    maxPrice: 'all',
  });

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const params: Record<string, string | boolean | number | undefined> = {};
      if (filters.category !== 'all') params.category = filters.category;
      if (filters.city !== 'all') params.city = filters.city;
      if (filters.transmission !== 'all') params.transmission = filters.transmission;
      if (filters.chauffeur === 'yes') params.chauffeur = true;
      if (filters.chauffeur === 'no') params.chauffeur = false;
      if (filters.maxPrice !== 'all') params.maxPrice = parseInt(filters.maxPrice);
      const data = await getCars(params);
      setCars(data);
      setLoading(false);
    };
    load();
  }, [filters]);

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Filters sidebar */}
      <div className="w-full lg:w-64 shrink-0">
        <CarFilters filters={filters} onChange={setFilters} />
      </div>

      {/* Cars grid */}
      <div className="flex-1">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : cars.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg">Aucun véhicule ne correspond à vos critères.</p>
            <button onClick={() => setFilters({ category: 'all', city: 'all', transmission: 'all', chauffeur: 'all', maxPrice: 'all' })} className="mt-4 text-[#f59e0b] hover:underline">
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-4">{cars.length} véhicule{cars.length > 1 ? 's' : ''} disponible{cars.length > 1 ? 's' : ''}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {cars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
