import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Users, Fuel, Settings2, UserCheck } from 'lucide-react';
import { Car } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface CarCardProps {
  car: Car;
}

const fuelLabels: Record<string, string> = {
  petrol: 'Essence',
  diesel: 'Diesel',
  electric: 'Électrique',
  hybrid: 'Hybride',
};

const transmissionLabels: Record<string, string> = {
  manual: 'Manuelle',
  automatic: 'Automatique',
};

export default function CarCard({ car }: CarCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 w-full">
        <Image
          src={car.main_image_url}
          alt={car.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant="default">{car.category}</Badge>
          {car.chauffeur_available && (
            <Badge variant="warning">
              <UserCheck className="h-3 w-3 mr-1" /> Chauffeur
            </Badge>
          )}
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg text-[#1a1f36] mb-2">{car.title}</h3>
        <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-3">
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" /> {car.city}
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" /> {car.seats} places
          </span>
          <span className="flex items-center gap-1">
            <Settings2 className="h-3.5 w-3.5" /> {transmissionLabels[car.transmission]}
          </span>
          <span className="flex items-center gap-1">
            <Fuel className="h-3.5 w-3.5" /> {fuelLabels[car.fuel_type]}
          </span>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div>
            <span className="text-2xl font-bold text-[#1a1f36]">{formatCurrency(car.price_per_day)}</span>
            <span className="text-gray-400 text-sm">/jour</span>
          </div>
          <Link href={`/cars/${car.slug}`}>
            <Button size="sm" className="bg-[#f59e0b] hover:bg-[#f59e0b]/90 text-white">
              Voir détails
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
