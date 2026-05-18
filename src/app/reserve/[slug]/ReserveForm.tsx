'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { differenceInDays } from 'date-fns';
import { Car } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { reservationWhatsAppMessage, buildWhatsAppUrl } from '@/lib/whatsapp';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface ReserveFormProps {
  car: Car;
}

export default function ReserveForm({ car }: ReserveFormProps) {
  const router = useRouter();
  const today = new Date().toISOString().split('T')[0];

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [withChauffeur, setWithChauffeur] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const days =
    startDate && endDate
      ? Math.max(0, differenceInDays(new Date(endDate), new Date(startDate)))
      : 0;

  const totalEstimate =
    days > 0
      ? days * car.pricePerDay + (withChauffeur ? days * car.chauffeurPricePerDay : 0)
      : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim()) { setError('Veuillez indiquer votre nom complet.'); return; }
    if (!phone.trim()) { setError('Veuillez indiquer votre numéro de téléphone.'); return; }
    if (!startDate || !endDate) { setError('Veuillez sélectionner les dates.'); return; }
    if (days < 1) { setError('La date de fin doit être après la date de début.'); return; }
    if (!pickupLocation.trim()) { setError('Veuillez indiquer le lieu de prise en charge.'); return; }

    setLoading(true);

    const waMessage = reservationWhatsAppMessage({
      carTitle: car.title,
      startDate,
      endDate,
      pickupLocation,
      withChauffeur,
      fullName,
      phone,
    });
    const waUrl = buildWhatsAppUrl(waMessage, car.whatsappPhone);

    // Persist request params in URL for success page
    const params = new URLSearchParams({
      carSlug: car.slug,
      carTitle: car.title,
      fullName,
      phone,
      email,
      startDate,
      endDate,
      pickupLocation,
      withChauffeur: withChauffeur ? 'true' : 'false',
      message,
      waUrl,
    });

    router.push(`/reservation-success?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Personal info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label htmlFor="fullName">Nom complet *</Label>
          <Input
            id="fullName"
            placeholder="Prénom Nom"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="phone">Téléphone / WhatsApp *</Label>
          <Input
            id="phone"
            placeholder="+229 97 00 00 00"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="votre@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label htmlFor="startDate">Date de début *</Label>
          <Input
            id="startDate"
            type="date"
            min={today}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="endDate">Date de fin *</Label>
          <Input
            id="endDate"
            type="date"
            min={startDate || today}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
      </div>

      {days > 0 && (
        <div className="bg-[#f59e0b]/10 border border-[#f59e0b]/30 rounded-lg p-3 text-sm">
          <span className="font-medium text-[#1a1f36]">
            {days} jour{days > 1 ? 's' : ''} — Estimation :{' '}
            <strong>{formatCurrency(totalEstimate)}</strong>
          </span>
          <span className="text-gray-500 ml-1">(à confirmer après votre demande)</span>
        </div>
      )}

      {/* Pickup */}
      <div className="space-y-1">
        <Label htmlFor="pickup">Lieu de prise en charge *</Label>
        <Input
          id="pickup"
          placeholder="Ex: Aéroport de Cotonou, Hôtel du Lac, adresse..."
          value={pickupLocation}
          onChange={(e) => setPickupLocation(e.target.value)}
          required
        />
      </div>

      {/* Chauffeur */}
      {car.chauffeurAvailable && (
        <div className="flex items-center gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <input
            type="checkbox"
            id="chauffeur"
            checked={withChauffeur}
            onChange={(e) => setWithChauffeur(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 accent-[#f59e0b]"
          />
          <label htmlFor="chauffeur" className="text-sm cursor-pointer">
            <span className="font-medium">Avec chauffeur</span>
            <span className="text-gray-500 ml-2">
              (+{formatCurrency(car.chauffeurPricePerDay)}/jour)
            </span>
          </label>
        </div>
      )}

      {/* Message */}
      <div className="space-y-1">
        <Label htmlFor="message">Message / Demande particulière</Label>
        <Textarea
          id="message"
          placeholder="Heure d'arrivée, besoin spécial, questions..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
        />
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
          {error}
        </p>
      )}

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-[#f59e0b] hover:bg-[#f59e0b]/90 text-white h-12 text-base font-semibold"
      >
        {loading ? 'En cours...' : 'Envoyer ma demande →'}
      </Button>

      <p className="text-xs text-center text-gray-400">
        Aucun paiement à ce stade. La disponibilité est confirmée par notre équipe sur WhatsApp.
      </p>
    </form>
  );
}
