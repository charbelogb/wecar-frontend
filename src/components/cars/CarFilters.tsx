'use client';

import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface FiltersState {
  category: string;
  city: string;
  transmission: string;
  chauffeur: string;
  maxPrice: string;
}

interface CarFiltersProps {
  filters: FiltersState;
  onChange: (filters: FiltersState) => void;
}

export default function CarFilters({ filters, onChange }: CarFiltersProps) {
  const update = (key: keyof FiltersState, value: string) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-4">
      <h3 className="font-semibold text-[#1a1f36] text-lg">Filtres</h3>

      <div className="space-y-2">
        <Label>Catégorie</Label>
        <Select value={filters.category} onValueChange={(v) => update('category', v)}>
          <SelectTrigger>
            <SelectValue placeholder="Toutes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes</SelectItem>
            <SelectItem value="Berline">Berline</SelectItem>
            <SelectItem value="SUV">SUV</SelectItem>
            <SelectItem value="Utilitaire">Utilitaire</SelectItem>
            <SelectItem value="Minibus">Minibus</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Ville</Label>
        <Select value={filters.city} onValueChange={(v) => update('city', v)}>
          <SelectTrigger>
            <SelectValue placeholder="Toutes les villes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les villes</SelectItem>
            <SelectItem value="Cotonou">Cotonou</SelectItem>
            <SelectItem value="Porto-Novo">Porto-Novo</SelectItem>
            <SelectItem value="Parakou">Parakou</SelectItem>
            <SelectItem value="Abomey-Calavi">Abomey-Calavi</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Transmission</Label>
        <Select value={filters.transmission} onValueChange={(v) => update('transmission', v)}>
          <SelectTrigger>
            <SelectValue placeholder="Toutes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes</SelectItem>
            <SelectItem value="automatic">Automatique</SelectItem>
            <SelectItem value="manual">Manuelle</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Chauffeur disponible</Label>
        <Select value={filters.chauffeur} onValueChange={(v) => update('chauffeur', v)}>
          <SelectTrigger>
            <SelectValue placeholder="Peu importe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Peu importe</SelectItem>
            <SelectItem value="yes">Avec chauffeur</SelectItem>
            <SelectItem value="no">Sans chauffeur</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Budget max / jour</Label>
        <Select value={filters.maxPrice} onValueChange={(v) => update('maxPrice', v)}>
          <SelectTrigger>
            <SelectValue placeholder="Pas de limite" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Pas de limite</SelectItem>
            <SelectItem value="50000">50 000 XOF</SelectItem>
            <SelectItem value="75000">75 000 XOF</SelectItem>
            <SelectItem value="100000">100 000 XOF</SelectItem>
            <SelectItem value="150000">150 000 XOF</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
