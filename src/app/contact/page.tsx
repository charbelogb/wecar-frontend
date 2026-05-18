'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="bg-[#1a1f36] text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-3">Contactez-nous</h1>
          <p className="text-gray-300">Notre équipe est disponible pour répondre à toutes vos questions.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-bold text-[#1a1f36] mb-4">Informations de contact</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[#f59e0b] shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Adresse</p>
                  <p className="text-gray-500 text-sm">Rue de la Mer, Cotonou, Bénin</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-[#f59e0b] shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Téléphone</p>
                  <p className="text-gray-500 text-sm">+229 97 00 00 00</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-[#f59e0b] shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Email</p>
                  <p className="text-gray-500 text-sm">contact@wecar.bj</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-[#f59e0b] shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Horaires</p>
                  <p className="text-gray-500 text-sm">Lun-Sam: 8h00 - 20h00</p>
                  <p className="text-gray-500 text-sm">Dim: 9h00 - 18h00</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            {submitted ? (
              <div className="text-center py-8">
                <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-[#1a1f36] mb-2">Message envoyé!</h3>
                <p className="text-gray-500">Nous vous répondrons dans les 24 heures.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="font-bold text-[#1a1f36] text-lg mb-4">Envoyez-nous un message</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="name">Nom complet *</Label>
                    <Input id="name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} required />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input id="phone" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="subject">Sujet *</Label>
                  <Input id="subject" value={form.subject} onChange={(e) => setForm({...form, subject: e.target.value})} required />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea id="message" rows={5} value={form.message} onChange={(e) => setForm({...form, message: e.target.value})} required />
                </div>
                <Button type="submit" className="w-full bg-[#f59e0b] hover:bg-[#f59e0b]/90 text-white">
                  Envoyer le message
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
