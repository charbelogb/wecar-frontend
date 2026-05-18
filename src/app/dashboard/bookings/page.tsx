import React from 'react';
import Link from 'next/link';
import { Calendar } from 'lucide-react';
import { mockBookings } from '@/lib/mock-data';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

export default function BookingsPage() {
  const bookings = mockBookings.filter((b) => b.user_id === 'user-1');

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1a1f36]">Mes réservations</h1>
        <p className="text-gray-500">Historique de toutes vos réservations</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Toutes mes réservations ({bookings.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {bookings.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Calendar className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium mb-2">Aucune réservation</h3>
              <p className="text-sm">Vous n&apos;avez pas encore effectué de réservation.</p>
              <Link href="/cars" className="mt-4 inline-block text-[#f59e0b] hover:underline">Voir nos voitures →</Link>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <Link key={booking.id} href={`/dashboard/bookings/${booking.id}`} className="block p-4 rounded-lg border border-gray-200 hover:border-[#f59e0b] hover:shadow-sm transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-[#1a1f36]">{booking.car?.title}</h3>
                      <p className="text-sm text-gray-500">
                        {formatDate(booking.start_date)} → {formatDate(booking.end_date)} • {booking.days_count} jour{booking.days_count > 1 ? 's' : ''}
                      </p>
                      <p className="text-sm text-gray-500">{booking.pickup_location}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-[#1a1f36]">{formatCurrency(booking.total_amount)}</p>
                      <Badge variant={statusVariants[booking.booking_status]}>{statusLabels[booking.booking_status]}</Badge>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
