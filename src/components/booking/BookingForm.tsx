'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { differenceInDays } from 'date-fns';
import { Car } from '@/types';
import { createBooking } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface BookingFormProps {
  car: Car;
}

export default function BookingForm({ car }: BookingFormProps) {
  const router = useRouter();
  const today = new Date().toISOString().split('T')[0];

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [chauffeur, setChauffeur] = useState(false);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const days = startDate && endDate ? differenceInDays(new Date(endDate), new Date(startDate)) : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!startDate || !endDate) {
      setError('Veuillez sélectionner les dates de début et de fin.');
      return;
    }
    if (days < 1) {
      setError('La date de fin doit être après la date de début.');
      return;
    }
    if (!pickupLocation.trim()) {
      setError('Veuillez indiquer le lieu de prise en charge.');
      return;
    }

    setLoading(true);
    try {
      const booking = await createBooking({
        car_id: car.id,
        start_date: startDate,
        end_date: endDate,
        pickup_location: pickupLocation,
        chauffeur_selected: chauffeur,
        notes,
      });
      router.push(`/checkout/${booking.id}`);
    } catch {
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label htmlFor="start_date">Date de début *</Label>
          <Input
            id="start_date"
            type="date"
            min={today}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="end_date">Date de fin *</Label>
          <Input
            id="end_date"
            type="date"
            min={startDate || today}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
      </div>

      {days > 0 && (
        <p className="text-sm text-[#f59e0b] font-medium">{days} jour{days > 1 ? 's' : ''} de location</p>
      )}

      <div className="space-y-1">
        <Label htmlFor="pickup">Lieu de prise en charge *</Label>
        <Input
          id="pickup"
          placeholder="Ex: Aéroport de Cotonou, Hôtel du Lac..."
          value={pickupLocation}
          onChange={(e) => setPickupLocation(e.target.value)}
          required
        />
      </div>

      {car.chauffeur_available && (
        <div className="flex items-center space-x-3 p-3 bg-amber-50 border border-amber-200 rounded-md">
          <input
            type="checkbox"
            id="chauffeur"
            checked={chauffeur}
            onChange={(e) => setChauffeur(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-[#f59e0b]"
          />
          <label htmlFor="chauffeur" className="text-sm">
            <span className="font-medium">Ajouter un chauffeur</span>
            <span className="text-gray-500 ml-2">(+{car.chauffeur_price_per_day.toLocaleString()} XOF/jour)</span>
          </label>
        </div>
      )}

      <div className="space-y-1">
        <Label htmlFor="notes">Notes / Demandes spéciales</Label>
        <Textarea
          id="notes"
          placeholder="Heure d'arrivée, besoins particuliers..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
        />
      </div>

      {error && <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">{error}</p>}

      <Button type="submit" disabled={loading} className="w-full bg-[#f59e0b] hover:bg-[#f59e0b]/90 text-white h-11 text-base">
        {loading ? 'Chargement...' : 'Réserver maintenant'}
      </Button>
    </form>
  );
}
