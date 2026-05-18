'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { mockBookings } from '@/lib/mock-data';
import { formatCurrency, formatDate } from '@/lib/utils';
import { updateBookingStatus } from '@/lib/api';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Booking } from '@/types';

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

export default function AdminBookingDetailPage({ params }: PageProps) {
  const initialBooking = mockBookings.find((b) => b.id === params.id) || mockBookings[0];
  const [booking, setBooking] = useState(initialBooking);
  const [newStatus, setNewStatus] = useState(booking.booking_status);
  const [loading, setLoading] = useState(false);

  const handleStatusUpdate = async () => {
    setLoading(true);
    const updated = await updateBookingStatus(booking.id, newStatus as Booking['booking_status']);
    setBooking({ ...booking, booking_status: updated.booking_status });
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <Link href="/admin/bookings" className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#1a1f36] mb-3">
          <ArrowLeft className="h-4 w-4" /> Retour aux réservations
        </Link>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#1a1f36]">Réservation #{booking.id}</h1>
          <Badge>{statusLabels[booking.booking_status]}</Badge>
        </div>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader><CardTitle className="text-base">Véhicule</CardTitle></CardHeader>
          <CardContent>
            <p className="font-medium">{booking.car?.title}</p>
            <p className="text-sm text-gray-500">{booking.car?.category} • {booking.car?.city}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Dates & Détails</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Période</span>
              <span>{formatDate(booking.start_date)} → {formatDate(booking.end_date)} ({booking.days_count} jours)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Lieu de prise en charge</span>
              <span>{booking.pickup_location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Chauffeur</span>
              <span>{booking.chauffeur_selected ? 'Oui' : 'Non'}</span>
            </div>
            {booking.notes && (
              <div className="flex justify-between">
                <span className="text-gray-500">Notes</span>
                <span>{booking.notes}</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Financier</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Sous-total</span>
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
              <span>Acompte reçu</span>
              <span>{formatCurrency(booking.upfront_amount)}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Reste à encaisser</span>
              <span>{formatCurrency(booking.remaining_amount)}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Mettre à jour le statut</CardTitle></CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <Select value={newStatus} onValueChange={(v) => setNewStatus(v as Booking['booking_status'])}>
                <SelectTrigger className="flex-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="paid">Payé</SelectItem>
                  <SelectItem value="confirmed">Confirmé</SelectItem>
                  <SelectItem value="cancelled">Annulé</SelectItem>
                  <SelectItem value="completed">Terminé</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleStatusUpdate} disabled={loading} className="bg-[#f59e0b] hover:bg-[#f59e0b]/90 text-white">
                {loading ? 'Mise à jour...' : 'Mettre à jour'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
