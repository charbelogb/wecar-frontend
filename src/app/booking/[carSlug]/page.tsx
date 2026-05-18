import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { getCarBySlug } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';
import BookingForm from '@/components/booking/BookingForm';
import { Badge } from '@/components/ui/badge';

interface PageProps {
  params: { carSlug: string };
}

export default async function BookingPage({ params }: PageProps) {
  const car = await getCarBySlug(params.carSlug);
  if (!car) notFound();

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="bg-[#1a1f36] text-white py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href={`/cars/${car.slug}`} className="flex items-center gap-2 text-gray-300 hover:text-white mb-3 text-sm">
            <ArrowLeft className="h-4 w-4" /> Retour au véhicule
          </Link>
          <h1 className="text-2xl font-bold">Réserver: {car.title}</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Car summary */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="relative h-48 rounded-lg overflow-hidden mb-4">
              <Image src={car.main_image_url} alt={car.title} fill className="object-cover" sizes="400px" />
            </div>
            <h2 className="font-bold text-[#1a1f36] text-xl mb-2">{car.title}</h2>
            <div className="flex gap-2 mb-3">
              <Badge>{car.category}</Badge>
              <Badge variant="secondary">{car.city}</Badge>
            </div>
            <p className="text-2xl font-bold text-[#1a1f36]">{formatCurrency(car.price_per_day)}<span className="text-sm font-normal text-gray-400">/jour</span></p>
          </div>

          {/* Booking form */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-bold text-[#1a1f36] text-lg mb-4">Détails de la réservation</h2>
            <BookingForm car={car} />
          </div>
        </div>
      </div>
    </div>
  );
}
