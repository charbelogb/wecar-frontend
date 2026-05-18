import React from 'react';
import Link from 'next/link';
import { Calendar, Car, Clock } from 'lucide-react';
import { mockBookings, mockCars } from '@/lib/mock-data';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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

export default function DashboardPage() {
  const bookings = mockBookings.filter((b) => b.user_id === 'user-1');
  const activeBookings = bookings.filter((b) => ['confirmed', 'paid'].includes(b.booking_status));

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1a1f36]">Bienvenue, Kofi!</h1>
        <p className="text-gray-500">Gérez vos réservations et votre profil.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="h-10 w-10 bg-[#f59e0b]/10 rounded-full flex items-center justify-center">
              <Calendar className="h-5 w-5 text-[#f59e0b]" />
            </div>
            <div>
              <div className="text-2xl font-bold text-[#1a1f36]">{bookings.length}</div>
              <div className="text-sm text-gray-500">Réservations total</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
              <Car className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-[#1a1f36]">{activeBookings.length}</div>
              <div className="text-sm text-gray-500">Réservations actives</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Clock className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-[#1a1f36]">{mockCars.filter(c => c.status === 'active').length}</div>
              <div className="text-sm text-gray-500">Voitures disponibles</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Mes dernières réservations</CardTitle>
          <Link href="/dashboard/bookings">
            <Button variant="outline" size="sm">Voir tout</Button>
          </Link>
        </CardHeader>
        <CardContent>
          {bookings.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>Aucune réservation pour le moment.</p>
              <Link href="/cars" className="mt-3 inline-block text-[#f59e0b] hover:underline text-sm">Explorer nos voitures</Link>
            </div>
          ) : (
            <div className="space-y-3">
              {bookings.map((booking) => (
                <Link key={booking.id} href={`/dashboard/bookings/${booking.id}`} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                  <div>
                    <p className="font-medium text-[#1a1f36]">{booking.car?.title}</p>
                    <p className="text-sm text-gray-500">{formatDate(booking.start_date)} → {formatDate(booking.end_date)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#1a1f36]">{formatCurrency(booking.total_amount)}</p>
                    <Badge variant={statusVariants[booking.booking_status]}>{statusLabels[booking.booking_status]}</Badge>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mt-6 text-center">
        <Link href="/cars">
          <Button className="bg-[#f59e0b] hover:bg-[#f59e0b]/90 text-white">
            Réserver une nouvelle voiture
          </Button>
        </Link>
      </div>
    </div>
  );
}
