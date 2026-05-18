'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { createCar } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function NewCarPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '', brand: '', model: '', year: new Date().getFullYear().toString(),
    category: 'Berline', city: 'Cotonou', price_per_day: '',
    deposit_amount: '', chauffeur_price_per_day: '',
    transmission: 'automatic', fuel_type: 'petrol', seats: '5',
    description: '', main_image_url: '', status: 'draft',
    chauffeur_available: false,
  });

  const update = (key: string, val: string | boolean) => setForm({ ...form, [key]: val });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createCar({
        ...form,
        year: parseInt(form.year),
        price_per_day: parseInt(form.price_per_day),
        deposit_amount: parseInt(form.deposit_amount),
        chauffeur_price_per_day: parseInt(form.chauffeur_price_per_day) || 0,
        seats: parseInt(form.seats),
        slug: `${form.brand.toLowerCase()}-${form.model.toLowerCase()}-${form.year}`.replace(/\s+/g, '-'),
        fuel_type: form.fuel_type as 'petrol' | 'diesel' | 'electric' | 'hybrid',
        transmission: form.transmission as 'manual' | 'automatic',
        status: form.status as 'draft' | 'active',
      });
      router.push('/admin/cars');
    } catch {
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <Link href="/admin/cars" className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#1a1f36] mb-3">
          <ArrowLeft className="h-4 w-4" /> Retour
        </Link>
        <h1 className="text-2xl font-bold text-[#1a1f36]">Ajouter un véhicule</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader><CardTitle>Informations générales</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1 sm:col-span-2">
              <Label>Titre *</Label>
              <Input value={form.title} onChange={(e) => update('title', e.target.value)} placeholder="Toyota Land Cruiser 2022" required />
            </div>
            <div className="space-y-1">
              <Label>Marque *</Label>
              <Input value={form.brand} onChange={(e) => update('brand', e.target.value)} placeholder="Toyota" required />
            </div>
            <div className="space-y-1">
              <Label>Modèle *</Label>
              <Input value={form.model} onChange={(e) => update('model', e.target.value)} placeholder="Land Cruiser" required />
            </div>
            <div className="space-y-1">
              <Label>Année *</Label>
              <Input type="number" value={form.year} onChange={(e) => update('year', e.target.value)} required />
            </div>
            <div className="space-y-1">
              <Label>Places *</Label>
              <Input type="number" value={form.seats} onChange={(e) => update('seats', e.target.value)} required />
            </div>
            <div className="space-y-1">
              <Label>Catégorie</Label>
              <Select value={form.category} onValueChange={(v) => update('category', v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Berline">Berline</SelectItem>
                  <SelectItem value="SUV">SUV</SelectItem>
                  <SelectItem value="Utilitaire">Utilitaire</SelectItem>
                  <SelectItem value="Minibus">Minibus</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label>Ville</Label>
              <Select value={form.city} onValueChange={(v) => update('city', v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cotonou">Cotonou</SelectItem>
                  <SelectItem value="Porto-Novo">Porto-Novo</SelectItem>
                  <SelectItem value="Parakou">Parakou</SelectItem>
                  <SelectItem value="Abomey-Calavi">Abomey-Calavi</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label>Transmission</Label>
              <Select value={form.transmission} onValueChange={(v) => update('transmission', v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="automatic">Automatique</SelectItem>
                  <SelectItem value="manual">Manuelle</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label>Carburant</Label>
              <Select value={form.fuel_type} onValueChange={(v) => update('fuel_type', v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="petrol">Essence</SelectItem>
                  <SelectItem value="diesel">Diesel</SelectItem>
                  <SelectItem value="hybrid">Hybride</SelectItem>
                  <SelectItem value="electric">Électrique</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Tarifs</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <Label>Prix/jour (XOF) *</Label>
              <Input type="number" value={form.price_per_day} onChange={(e) => update('price_per_day', e.target.value)} required />
            </div>
            <div className="space-y-1">
              <Label>Dépôt de garantie (XOF) *</Label>
              <Input type="number" value={form.deposit_amount} onChange={(e) => update('deposit_amount', e.target.value)} required />
            </div>
            <div className="space-y-1">
              <Label>Prix chauffeur/jour (XOF)</Label>
              <Input type="number" value={form.chauffeur_price_per_day} onChange={(e) => update('chauffeur_price_per_day', e.target.value)} />
            </div>
            <div className="flex items-center gap-2 sm:col-span-3">
              <input type="checkbox" id="chauffeur" checked={form.chauffeur_available} onChange={(e) => update('chauffeur_available', e.target.checked)} className="h-4 w-4" />
              <Label htmlFor="chauffeur">Chauffeur disponible</Label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Description & Image</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label>URL image principale *</Label>
              <Input value={form.main_image_url} onChange={(e) => update('main_image_url', e.target.value)} placeholder="https://..." required />
            </div>
            <div className="space-y-1">
              <Label>Description *</Label>
              <Textarea value={form.description} onChange={(e) => update('description', e.target.value)} rows={4} required />
            </div>
            <div className="space-y-1">
              <Label>Statut</Label>
              <Select value={form.status} onValueChange={(v) => update('status', v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Brouillon</SelectItem>
                  <SelectItem value="active">Actif</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button type="submit" disabled={loading} className="bg-[#f59e0b] hover:bg-[#f59e0b]/90 text-white flex-1">
            {loading ? 'Enregistrement...' : 'Enregistrer le véhicule'}
          </Button>
          <Link href="/admin/cars">
            <Button type="button" variant="outline">Annuler</Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
