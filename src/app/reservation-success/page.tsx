import { Metadata } from 'next';
import { Suspense } from 'react';
import SuccessContent from './SuccessContent';

export const metadata: Metadata = {
  title: 'Demande envoyée - WeCar',
  description: 'Votre demande de réservation a bien été envoyée. Notre équipe vous contacte sous 2h.',
};

export default function ReservationSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-400">Chargement...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
