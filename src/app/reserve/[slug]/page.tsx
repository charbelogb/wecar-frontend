import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { getCarBySlug } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import ReserveForm from './ReserveForm';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const car = await getCarBySlug(slug);
  return {
    title: car ? `Réserver ${car.title} - WeCar` : 'Réservation - WeCar',
  };
}

export default async function ReservePage({ params }: PageProps) {
  const { slug } = await params;
  const car = await getCarBySlug(slug);
  if (!car) notFound();

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Header */}
      <div className="bg-[#1a1f36] text-white py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href={`/cars/${car.slug}`}
            className="flex items-center gap-2 text-gray-300 hover:text-white mb-4 text-sm w-fit"
          >
            <ArrowLeft className="h-4 w-4" /> Retour au véhicule
          </Link>
          <h1 className="text-2xl font-bold">Demande de réservation</h1>
          <p className="text-gray-300 mt-1">
            Aucun paiement requis maintenant — nous confirmons la disponibilité par WhatsApp.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Vehicle summary — left on desktop */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200 p-4 md:sticky md:top-24">
              <div className="relative h-44 rounded-lg overflow-hidden mb-4">
                <Image
                  src={car.mainImageUrl}
                  alt={car.title}
                  fill
                  className="object-cover"
                  sizes="400px"
                />
              </div>
              <h2 className="font-bold text-[#1a1f36] text-lg mb-2">{car.title}</h2>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge>{car.category}</Badge>
                <Badge variant="secondary">{car.city}</Badge>
              </div>
              <p className="text-2xl font-bold text-[#1a1f36]">
                {formatCurrency(car.pricePerDay)}
                <span className="text-sm font-normal text-gray-400">/jour</span>
              </p>
              {car.chauffeurAvailable && (
                <p className="text-xs text-gray-500 mt-1">
                  +{formatCurrency(car.chauffeurPricePerDay)}/jour avec chauffeur
                </p>
              )}
              <div className="mt-4 pt-4 border-t border-gray-100 space-y-1 text-xs text-gray-500">
                <p>✔ Disponibilité confirmée après votre demande</p>
                <p>✔ Paiement après confirmation</p>
                <p>✔ Réponse WhatsApp sous 2h</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-bold text-[#1a1f36] text-lg mb-1">Vos informations</h2>
              <p className="text-sm text-gray-500 mb-6">
                Remplissez le formulaire ci-dessous. Nous vous contacterons par WhatsApp pour confirmer.
              </p>
              <ReserveForm car={car} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
