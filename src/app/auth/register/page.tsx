'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Car } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function RegisterPage() {
  const [form, setForm] = useState({ full_name: '', email: '', phone: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }
    setLoading(true);
    try {
      await register({ full_name: form.full_name, email: form.email, phone: form.phone, password: form.password });
      router.push('/dashboard');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'inscription');
    } finally {
      setLoading(false);
    }
  };

  const update = (key: string, val: string) => setForm({ ...form, [key]: val });

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <Car className="h-8 w-8 text-[#f59e0b]" />
            <span className="text-2xl font-bold text-[#1a1f36]">WeCar</span>
          </Link>
          <h1 className="text-2xl font-bold text-[#1a1f36] mt-4">Créer un compte</h1>
          <p className="text-gray-500 mt-1">Rejoignez WeCar aujourd&apos;hui</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="full_name">Nom complet</Label>
              <Input id="full_name" value={form.full_name} onChange={(e) => update('full_name', e.target.value)} placeholder="Jean Dupont" required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="votre@email.com" required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="phone">Téléphone</Label>
              <Input id="phone" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+229 97 00 00 00" required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Mot de passe</Label>
              <Input id="password" type="password" value={form.password} onChange={(e) => update('password', e.target.value)} placeholder="••••••••" required minLength={6} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="confirm">Confirmer le mot de passe</Label>
              <Input id="confirm" type="password" value={form.confirm} onChange={(e) => update('confirm', e.target.value)} placeholder="••••••••" required />
            </div>
            {error && <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">{error}</p>}
            <Button type="submit" disabled={loading} className="w-full bg-[#f59e0b] hover:bg-[#f59e0b]/90 text-white">
              {loading ? 'Inscription...' : 'S\'inscrire'}
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-500 mt-4">
          Déjà un compte?{' '}
          <Link href="/auth/login" className="text-[#f59e0b] hover:underline font-medium">Se connecter</Link>
        </p>
      </div>
    </div>
  );
}
