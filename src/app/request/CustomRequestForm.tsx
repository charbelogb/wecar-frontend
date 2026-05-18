'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { customRequestWhatsAppMessage, buildWhatsAppUrl } from '@/lib/whatsapp';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const vehicleTypes = ['Berline', 'SUV', 'Minibus', 'Utilitaire', 'Peu importe'];
const budgets = [
  'Moins de 30 000 XOF/jour',
  '30 000 – 60 000 XOF/jour',
  '60 000 – 100 000 XOF/jour',
  'Plus de 100 000 XOF/jour',
  'Je ne sais pas encore',
];
const cities = ['Cotonou', 'Porto-Novo', 'Parakou', 'Abomey-Calavi', 'Autre'];

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '22997000000';

export default function CustomRequestForm() {
  const router = useRouter();
  const today = new Date().toISOString().split('T')[0];

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [city, setCity] = useState('');
  const [budget, setBudget] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [withChauffeur, setWithChauffeur] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim()) { setError('Veuillez indiquer votre nom complet.'); return; }
    if (!phone.trim()) { setError('Veuillez indiquer votre numéro de téléphone.'); return; }
    if (!startDate || !endDate) { setError('Veuillez sélectionner les dates.'); return; }
    if (!city) { setError('Veuillez sélectionner une ville.'); return; }
    if (!budget) { setError('Veuillez indiquer votre budget.'); return; }
    if (!vehicleType) { setError('Veuillez choisir un type de véhicule.'); return; }

    setLoading(true);

    const waMessage = customRequestWhatsAppMessage({
      fullName,
      phone,
      startDate,
      endDate,
      city,
      vehicleType,
      budget,
      withChauffeur,
      message,
    });
    const waUrl = buildWhatsAppUrl(waMessage, WHATSAPP);

    const params = new URLSearchParams({
      type: 'custom',
      fullName,
      phone,
      email,
      startDate,
      endDate,
      city,
      vehicleType,
      budget,
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

      {/* City */}
      <div className="space-y-1">
        <Label>Ville *</Label>
        <Select value={city} onValueChange={setCity} required>
          <SelectTrigger>
            <SelectValue placeholder="Choisissez une ville" />
          </SelectTrigger>
          <SelectContent>
            {cities.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Budget */}
      <div className="space-y-1">
        <Label>Budget estimé *</Label>
        <Select value={budget} onValueChange={setBudget} required>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner un budget" />
          </SelectTrigger>
          <SelectContent>
            {budgets.map((b) => (
              <SelectItem key={b} value={b}>{b}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Vehicle type */}
      <div className="space-y-1">
        <Label>Type de véhicule souhaité *</Label>
        <Select value={vehicleType} onValueChange={setVehicleType} required>
          <SelectTrigger>
            <SelectValue placeholder="Choisissez un type" />
          </SelectTrigger>
          <SelectContent>
            {vehicleTypes.map((t) => (
              <SelectItem key={t} value={t}>{t}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Chauffeur */}
      <div className="flex items-center gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
        <input
          type="checkbox"
          id="chauffeur"
          checked={withChauffeur}
          onChange={(e) => setWithChauffeur(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 accent-[#f59e0b]"
        />
        <label htmlFor="chauffeur" className="text-sm cursor-pointer font-medium">
          Je souhaite un chauffeur
        </label>
      </div>

      {/* Message */}
      <div className="space-y-1">
        <Label htmlFor="message">Message / Précisions (optionnel)</Label>
        <Textarea
          id="message"
          placeholder="Usage prévu, nombre de passagers, horaires, questions..."
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
        Aucun paiement à ce stade. Notre équipe vous répond par WhatsApp sous 2h.
      </p>
    </form>
  );
}
