import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, Users, Fuel, Settings2, Shield, CheckCircle, MessageCircle } from 'lucide-react';
import { getCarBySlug, getSimilarCars } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import CarGallery from '@/components/cars/CarGallery';
import CarCard from '@/components/cars/CarCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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

  const similarCars = getSimilarCars(car);
  const whatsappUrl = buildWhatsAppUrl(
    `Bonjour WeCar 👋\nJe suis intéressé(e) par le *${car.title}* à ${formatCurrency(car.pricePerDay)}/jour.\nPouvez-vous me confirmer la disponibilité ?`,
    car.whatsappPhone
  );

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Header */}
      <div className="bg-[#1a1f36] text-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <nav className="text-sm text-gray-400 mb-2">
            <Link href="/cars" className="hover:text-white">Nos voitures</Link>{' '}
            / <span className="text-white">{car.title}</span>
          </nav>
          <h1 className="text-3xl font-bold">{car.title}</h1>
          <p className="text-gray-300 mt-1">{car.year} · {car.category} · {car.city}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left: Gallery + Details */}
          <div className="lg:col-span-2 space-y-6">
            <CarGallery mainImage={car.mainImageUrl} images={car.images} title={car.title} />

            {/* Badges + specs */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex flex-wrap gap-2 mb-5">
                <Badge>{car.category}</Badge>
                {car.chauffeurAvailable && <Badge variant="warning">Chauffeur disponible</Badge>}
                <Badge variant="secondary">{car.year}</Badge>
                <Badge variant="secondary">{car.city}</Badge>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-[#f59e0b] shrink-0" />
                  <span>{car.city}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-[#f59e0b] shrink-0" />
                  <span>{car.seats} places</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Settings2 className="h-4 w-4 text-[#f59e0b] shrink-0" />
                  <span>{car.transmission === 'automatic' ? 'Automatique' : 'Manuelle'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Fuel className="h-4 w-4 text-[#f59e0b] shrink-0" />
                  <span>{fuelLabels[car.fuelType]}</span>
                </div>
              </div>

              <Separator className="mb-5" />
              <h3 className="font-semibold text-[#1a1f36] mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{car.description}</p>
            </div>

            {/* Features */}
            {car.features.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-semibold text-[#1a1f36] mb-4">Équipements inclus</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {car.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="h-4 w-4 text-[#f59e0b] shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pickup zone */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-[#1a1f36] mb-2">Zone de prise en charge</h3>
              <p className="text-gray-600 text-sm mb-3">{car.pickupZone}</p>
              {car.includedZones.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {car.includedZones.map((z) => (
                    <span key={z} className="bg-[#f59e0b]/10 text-[#1a1f36] text-xs font-medium px-3 py-1 rounded-full">
                      {z}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Policies */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                <h3 className="font-semibold text-[#1a1f36] mb-2 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-[#f59e0b]" /> Conditions de location
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{car.rentalPolicy}</p>
                <p className="text-sm text-gray-600 mt-2">Caution : <strong>{formatCurrency(car.depositAmount)}</strong></p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                <h3 className="font-semibold text-[#1a1f36] mb-2">Politique d&apos;annulation</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{car.cancellationPolicy}</p>
              </div>
            </div>
          </div>

          {/* Right: Sticky booking card */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 p-6 lg:sticky lg:top-20">
              {/* Price */}
              <div className="mb-4">
                <span className="text-4xl font-bold text-[#1a1f36]">{formatCurrency(car.pricePerDay)}</span>
                <span className="text-gray-400">/jour</span>
              </div>
              {car.chauffeurAvailable && (
                <p className="text-sm text-gray-500 mb-3">
                  + {formatCurrency(car.chauffeurPricePerDay)}/jour avec chauffeur
                </p>
              )}

              <Separator className="mb-4" />

              {/* Info badges */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                  Disponibilité confirmée après votre demande
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                  Paiement uniquement après confirmation
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                  Réponse WhatsApp sous 2h
                </div>
              </div>

              {/* Reserve CTA */}
              <Link href={`/reserve/${car.slug}`} className="block">
                <Button className="w-full bg-[#f59e0b] hover:bg-[#f59e0b]/90 text-white h-12 text-base font-semibold mb-3">
                  Réserver ce véhicule
                </Button>
              </Link>

              {/* WhatsApp CTA */}
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block">
                <Button variant="outline" className="w-full h-11 border-green-500 text-green-700 hover:bg-green-50">
                  <MessageCircle className="mr-2 h-4 w-4" /> Poser une question sur WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Similar vehicles */}
        {similarCars.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-[#1a1f36] mb-6">Véhicules similaires</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarCars.map((c) => (
                <CarCard key={c.id} car={c} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
