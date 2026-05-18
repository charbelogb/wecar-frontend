import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, MapPin, Car, ArrowLeft } from 'lucide-react';
import { mockBookings } from '@/lib/mock-data';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface PageProps {
  params: { id: string };
}

const statusLabels: Record<string, string> = {
  pending: 'En attente',
  paid: 'Payé',
  confirmed: 'Confirmé',
  cancelled: 'Annulé',
  completed: 'Terminé',
};

const statusVariants: Record<string, 'default' | 'warning' | 'success' | 'destructive' | 'secondary'> = {
  pending: 'warning',
  paid: 'default',
  confirmed: 'success',
  cancelled: 'destructive',
  completed: 'secondary',
};

export default function BookingDetailPage({ params }: PageProps) {
  const booking = mockBookings.find((b) => b.id === params.id);
  if (!booking) notFound();

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href="/dashboard/bookings" className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#1a1f36] mb-4">
          <ArrowLeft className="h-4 w-4" /> Retour aux réservations
        </Link>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#1a1f36]">Réservation #{booking.id}</h1>
          <Badge variant={statusVariants[booking.booking_status]}>{statusLabels[booking.booking_status]}</Badge>
        </div>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader><CardTitle className="text-base">Véhicule</CardTitle></CardHeader>
          <CardContent className="flex items-center gap-3">
            <Car className="h-5 w-5 text-[#f59e0b]" />
            <div>
              <p className="font-medium">{booking.car?.title}</p>
              <p className="text-sm text-gray-500">{booking.car?.category} • {booking.car?.city}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Dates & Lieu</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-[#f59e0b]" />
              <div>
                <p className="text-sm font-medium">{formatDate(booking.start_date)} → {formatDate(booking.end_date)}</p>
                <p className="text-xs text-gray-500">{booking.days_count} jour{booking.days_count > 1 ? 's' : ''}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-[#f59e0b]" />
              <p className="text-sm">{booking.pickup_location}</p>
            </div>
            {booking.chauffeur_selected && (
              <div className="flex items-center gap-3">
                <span className="text-sm bg-amber-100 text-amber-700 px-2 py-0.5 rounded">Chauffeur inclus</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Récapitulatif financier</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">{booking.days_count} jours × prix/jour</span>
              <span>{formatCurrency(booking.subtotal_amount)}</span>
            </div>
            {booking.chauffeur_amount > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-500">Chauffeur</span>
                <span>{formatCurrency(booking.chauffeur_amount)}</span>
              </div>
            )}
            <Separator />
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>{formatCurrency(booking.total_amount)}</span>
            </div>
            <div className="flex justify-between text-amber-600">
              <span>Acompte payé</span>
              <span>{formatCurrency(booking.upfront_amount)}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Reste à payer</span>
              <span>{formatCurrency(booking.remaining_amount)}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
