import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BookingSuccessPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-12 w-12 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold text-[#1a1f36] mb-4">Réservation confirmée!</h1>
        <p className="text-gray-500 mb-6">
          Votre réservation a été confirmée avec succès. Vous recevrez un email de confirmation avec tous les détails.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/dashboard/bookings">
            <Button className="bg-[#f59e0b] hover:bg-[#f59e0b]/90 text-white">
              Voir mes réservations
            </Button>
          </Link>
          <Link href="/cars">
            <Button variant="outline">Continuer à explorer</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
