import { Suspense } from 'react';
import CarsClient from './CarsClient';
import { Skeleton } from '@/components/ui/skeleton';

export const metadata = {
  title: 'Nos voitures - WeCar',
  description: 'Découvrez toutes nos voitures disponibles à la location au Bénin.',
};

function CarsLoading() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <Skeleton className="h-48 w-full" />
          <div className="p-4 space-y-3">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function CarsPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="bg-[#1a1f36] text-white py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold">Nos voitures</h1>
          <p className="text-gray-300 mt-2">Trouvez le véhicule parfait pour votre séjour au Bénin</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Suspense fallback={<CarsLoading />}>
          <CarsClient />
        </Suspense>
      </div>
    </div>
  );
}
