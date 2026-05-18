import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, Users, Fuel, Settings2, Calendar, Shield } from 'lucide-react';
import { getCarBySlug } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';
import CarGallery from '@/components/cars/CarGallery';
import BookingForm from '@/components/booking/BookingForm';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const fuelLabels: Record<string, string> = {
  petrol: 'Essence',
  diesel: 'Diesel',
  electric: 'Électrique',
  hybrid: 'Hybride',
};

export default async function CarDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const car = await getCarBySlug(slug);

  if (!car) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="bg-[#1a1f36] text-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <nav className="text-sm text-gray-400 mb-2">
            <Link href="/cars" className="hover:text-white">Nos voitures</Link> / <span className="text-white">{car.title}</span>
          </nav>
          <h1 className="text-3xl font-bold">{car.title}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Gallery + Details */}
          <div className="lg:col-span-2 space-y-6">
            <CarGallery mainImage={car.main_image_url} images={car.images} title={car.title} />

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge>{car.category}</Badge>
                {car.chauffeur_available && <Badge variant="warning">Chauffeur disponible</Badge>}
                <Badge variant="secondary">{car.year}</Badge>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-[#f59e0b]" />
                  <span>{car.city}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-[#f59e0b]" />
                  <span>{car.seats} places</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Settings2 className="h-4 w-4 text-[#f59e0b]" />
                  <span>{car.transmission === 'automatic' ? 'Automatique' : 'Manuelle'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Fuel className="h-4 w-4 text-[#f59e0b]" />
                  <span>{fuelLabels[car.fuel_type]}</span>
                </div>
              </div>

              <Separator className="mb-4" />
              <h3 className="font-semibold text-[#1a1f36] mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{car.description}</p>
            </div>

            {/* Conditions */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
              <h3 className="font-semibold text-[#1a1f36] mb-3 flex items-center gap-2">
                <Shield className="h-5 w-5 text-[#f59e0b]" /> Conditions de location
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Dépôt de garantie: {formatCurrency(car.deposit_amount)}</li>
                <li>• Permis de conduire valide requis</li>
                <li>• Carburant non inclus</li>
                <li>• Retour dans le même état qu&apos;au départ</li>
              </ul>
            </div>
          </div>

          {/* Right: Booking form */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-20">
              <div className="mb-4">
                <span className="text-3xl font-bold text-[#1a1f36]">{formatCurrency(car.price_per_day)}</span>
                <span className="text-gray-400">/jour</span>
              </div>
              {car.chauffeur_available && (
                <p className="text-sm text-gray-500 mb-4">
                  + {formatCurrency(car.chauffeur_price_per_day)}/jour avec chauffeur
                </p>
              )}
              <Separator className="mb-4" />
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <Calendar className="h-4 w-4 text-[#f59e0b]" />
                <span>Acompte de 30% à la réservation</span>
              </div>
              <BookingForm car={car} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
