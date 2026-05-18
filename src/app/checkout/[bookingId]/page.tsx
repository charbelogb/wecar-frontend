import Link from 'next/link';
import { CreditCard, Shield, ArrowLeft } from 'lucide-react';
import { mockBookings } from '@/lib/mock-data';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface PageProps {
  params: { bookingId: string };
}

export default function CheckoutPage({ params }: PageProps) {
  const booking = mockBookings.find((b) => b.id === params.bookingId) || mockBookings[0];

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="bg-[#1a1f36] text-white py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/dashboard/bookings" className="flex items-center gap-2 text-gray-300 hover:text-white mb-3 text-sm">
            <ArrowLeft className="h-4 w-4" /> Retour
          </Link>
          <h1 className="text-2xl font-bold">Finaliser la réservation</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Order Summary */}
          <Card>
            <CardHeader><CardTitle>Récapitulatif</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="font-medium">{booking.car?.title}</p>
                <p className="text-gray-500">{formatDate(booking.start_date)} → {formatDate(booking.end_date)}</p>
                <p className="text-gray-500">{booking.pickup_location}</p>
              </div>
              <Separator />
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-gray-500">Sous-total</span>
                  <span>{formatCurrency(booking.subtotal_amount)}</span>
                </div>
                {booking.chauffeur_amount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Chauffeur</span>
                    <span>{formatCurrency(booking.chauffeur_amount)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{formatCurrency(booking.total_amount)}</span>
                </div>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-md p-3">
                <p className="text-amber-700 font-semibold">Acompte à payer maintenant (30%)</p>
                <p className="text-2xl font-bold text-amber-600">{formatCurrency(booking.upfront_amount)}</p>
                <p className="text-xs text-amber-600 mt-1">Le reste ({formatCurrency(booking.remaining_amount)}) sera payé à la prise en charge.</p>
              </div>
            </CardContent>
          </Card>

          {/* Payment */}
          <Card>
            <CardHeader><CardTitle>Paiement</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <button className="w-full p-4 border-2 border-[#f59e0b] rounded-lg text-left">
                  <div className="font-medium">📱 MTN Mobile Money</div>
                  <div className="text-sm text-gray-500">Paiement via MTN MoMo</div>
                </button>
                <button className="w-full p-4 border border-gray-200 rounded-lg text-left hover:border-gray-300">
                  <div className="font-medium">📱 Moov Money</div>
                  <div className="text-sm text-gray-500">Paiement via Moov Money</div>
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Shield className="h-4 w-4 text-green-500" />
                <span>Paiement 100% sécurisé</span>
              </div>

              <Link href="/booking/success">
                <Button className="w-full bg-[#f59e0b] hover:bg-[#f59e0b]/90 text-white h-11 text-base">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Payer {formatCurrency(booking.upfront_amount)}
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
