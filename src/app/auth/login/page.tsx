'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Car } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <Car className="h-8 w-8 text-[#f59e0b]" />
            <span className="text-2xl font-bold text-[#1a1f36]">WeCar</span>
          </Link>
          <h1 className="text-2xl font-bold text-[#1a1f36] mt-4">Connexion</h1>
          <p className="text-gray-500 mt-1">Accédez à votre espace client</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="votre@email.com" required />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Mot de passe</Label>
                <Link href="/auth/forgot-password" className="text-xs text-[#f59e0b] hover:underline">Mot de passe oublié?</Link>
              </div>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
            </div>
            {error && <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">{error}</p>}
            <Button type="submit" disabled={loading} className="w-full bg-[#f59e0b] hover:bg-[#f59e0b]/90 text-white">
              {loading ? 'Connexion...' : 'Se connecter'}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-500">
            <p className="text-xs text-gray-400 bg-gray-50 rounded p-2">
              Demo: kofi.mensah@example.com / password
            </p>
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 mt-4">
          Pas encore de compte?{' '}
          <Link href="/auth/register" className="text-[#f59e0b] hover:underline font-medium">S&apos;inscrire</Link>
        </p>
      </div>
    </div>
  );
}
