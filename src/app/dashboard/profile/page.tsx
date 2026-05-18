'use client';

import React, { useState } from 'react';
import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProfilePage() {
  const [form, setForm] = useState({
    full_name: 'Kofi Mensah',
    email: 'kofi.mensah@example.com',
    phone: '+229 97 12 34 56',
  });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const update = (key: string, val: string) => setForm({ ...form, [key]: val });

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1a1f36]">Mon profil</h1>
        <p className="text-gray-500">Gérez vos informations personnelles</p>
      </div>

      <div className="flex justify-center mb-6">
        <div className="h-20 w-20 rounded-full bg-[#1a1f36] flex items-center justify-center">
          <User className="h-10 w-10 text-[#f59e0b]" />
        </div>
      </div>

      <Card>
        <CardHeader><CardTitle>Informations personnelles</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="full_name">Nom complet</Label>
              <Input id="full_name" value={form.full_name} onChange={(e) => update('full_name', e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="phone">Téléphone</Label>
              <Input id="phone" value={form.phone} onChange={(e) => update('phone', e.target.value)} />
            </div>
            {saved && <p className="text-sm text-green-600 bg-green-50 border border-green-200 rounded p-2">Profil mis à jour avec succès!</p>}
            <Button type="submit" className="w-full bg-[#f59e0b] hover:bg-[#f59e0b]/90 text-white">
              Sauvegarder les modifications
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardHeader><CardTitle>Changer le mot de passe</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="space-y-1">
              <Label>Mot de passe actuel</Label>
              <Input type="password" placeholder="••••••••" />
            </div>
            <div className="space-y-1">
              <Label>Nouveau mot de passe</Label>
              <Input type="password" placeholder="••••••••" />
            </div>
            <Button variant="outline" className="w-full">Mettre à jour le mot de passe</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
