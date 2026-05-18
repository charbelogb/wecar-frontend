'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, MessageCircle, ArrowRight, Calendar, MapPin, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SuccessContent() {
  const params = useSearchParams();

  const isCustom = params.get('type') === 'custom';
  const carTitle = params.get('carTitle');
  const fullName = params.get('fullName') || '';
  const startDate = params.get('startDate') || '';
  const endDate = params.get('endDate') || '';
  const pickupLocation = params.get('pickupLocation') || '';
  const city = params.get('city') || '';
  const waUrl = params.get('waUrl') || '';

  const steps = [
    {
      icon: '💬',
      title: 'Confirmation WhatsApp (sous 2h)',
      desc: 'Notre équipe vérifie la disponibilité et vous contacte par WhatsApp pour confirmer.',
    },
    {
      icon: '💳',
      title: 'Paiement après confirmation',
      desc: 'Le paiement s\'effectue uniquement après confirmation de disponibilité. Pas de mauvaise surprise.',
    },
    {
      icon: '🚗',
      title: 'Prise en charge',
      desc: 'Le véhicule vous est remis à la date, l\'heure et au lieu convenus.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="max-w-2xl mx-auto px-4 py-16">

        {/* Success icon + headline */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center h-20 w-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="h-10 w-10 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-[#1a1f36] mb-3">
            Demande envoyée avec succès !
          </h1>
          <p className="text-gray-500 text-lg">
            {fullName ? `Merci ${fullName.split(' ')[0]}` : 'Merci'} — notre équipe vous contacte par WhatsApp sous 2h.
          </p>
        </div>

        {/* Summary card */}
        {(carTitle || isCustom) && (
          <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6 space-y-3">
            <h2 className="font-semibold text-[#1a1f36] text-sm uppercase tracking-wide mb-2">
              Récapitulatif de votre demande
            </h2>
            {carTitle && (
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <span className="text-lg">🚗</span>
                <span className="font-medium">{carTitle}</span>
              </div>
            )}
            {isCustom && (
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <span className="text-lg">🔍</span>
                <span className="font-medium">Demande personnalisée</span>
              </div>
            )}
            {startDate && endDate && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4 text-[#f59e0b] shrink-0" />
                <span>Du {startDate} au {endDate}</span>
              </div>
            )}
            {pickupLocation && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4 text-[#f59e0b] shrink-0" />
                <span>{pickupLocation}</span>
              </div>
            )}
            {city && !pickupLocation && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4 text-[#f59e0b] shrink-0" />
                <span>{city}</span>
              </div>
            )}
            {fullName && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="h-4 w-4 text-[#f59e0b] shrink-0" />
                <span>{fullName}</span>
              </div>
            )}
          </div>
        )}

        {/* Next steps */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
          <h2 className="font-semibold text-[#1a1f36] mb-4">Prochaines étapes</h2>
          <div className="space-y-4">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-3">
                <div className="text-2xl shrink-0">{step.icon}</div>
                <div>
                  <p className="font-medium text-sm text-[#1a1f36]">{step.title}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reminder box */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 text-sm text-amber-800">
          <p className="font-medium mb-1">À savoir :</p>
          <ul className="space-y-1 list-disc list-inside text-amber-700">
            <li>La disponibilité est confirmée manuellement par notre équipe</li>
            <li>Aucun paiement n&apos;est requis avant confirmation</li>
            <li>Vous recevrez les instructions de paiement par WhatsApp</li>
          </ul>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col gap-3">
          {waUrl && (
            <a href={waUrl} target="_blank" rel="noopener noreferrer">
              <Button className="w-full bg-green-500 hover:bg-green-600 text-white h-12 text-base font-semibold">
                <MessageCircle className="mr-2 h-5 w-5" />
                Ouvrir WhatsApp maintenant
              </Button>
            </a>
          )}
          <Link href="/cars">
            <Button variant="outline" className="w-full h-11">
              Voir d&apos;autres véhicules <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/">
            <Button variant="ghost" className="w-full h-11 text-gray-500">
              Retour à l&apos;accueil
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
