'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Car } from 'lucide-react';
import { forgotPassword } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await forgotPassword(email);
    setSent(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <Car className="h-8 w-8 text-[#f59e0b]" />
            <span className="text-2xl font-bold text-[#1a1f36]">WeCar</span>
          </Link>
          <h1 className="text-2xl font-bold text-[#1a1f36] mt-4">Mot de passe oublié</h1>
          <p className="text-gray-500 mt-1">Entrez votre email pour recevoir un lien de réinitialisation</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
          {sent ? (
            <div className="text-center">
              <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="font-bold text-[#1a1f36] mb-2">Email envoyé!</h3>
              <p className="text-gray-500 text-sm">Vérifiez votre boîte mail pour les instructions de réinitialisation.</p>
              <Link href="/auth/login" className="mt-4 block text-[#f59e0b] hover:underline text-sm">Retour à la connexion</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="votre@email.com" required />
              </div>
              <Button type="submit" disabled={loading} className="w-full bg-[#f59e0b] hover:bg-[#f59e0b]/90 text-white">
                {loading ? 'Envoi...' : 'Envoyer le lien'}
              </Button>
            </form>
          )}
        </div>

        <p className="text-center text-sm text-gray-500 mt-4">
          <Link href="/auth/login" className="text-[#f59e0b] hover:underline">Retour à la connexion</Link>
        </p>
      </div>
    </div>
  );
}
