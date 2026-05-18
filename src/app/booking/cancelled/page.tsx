import Link from 'next/link';
import { XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BookingCancelledPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="h-24 w-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="h-12 w-12 text-red-500" />
        </div>
        <h1 className="text-3xl font-bold text-[#1a1f36] mb-4">Réservation annulée</h1>
        <p className="text-gray-500 mb-6">
          Votre réservation a été annulée. Si vous avez des questions, n&apos;hésitez pas à nous contacter.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/cars">
            <Button className="bg-[#f59e0b] hover:bg-[#f59e0b]/90 text-white">
              Explorer nos voitures
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline">Contacter le support</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
