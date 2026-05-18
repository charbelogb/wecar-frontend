import React from 'react';
import { differenceInDays } from 'date-fns';
import { Car } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

interface PriceBreakdownProps {
  car: Car;
  startDate: string;
  endDate: string;
  chauffeurSelected: boolean;
}

export default function PriceBreakdown({ car, startDate, endDate, chauffeurSelected }: PriceBreakdownProps) {
  const days = startDate && endDate ? differenceInDays(new Date(endDate), new Date(startDate)) : 0;
  const subtotal = days * car.price_per_day;
  const chauffeurAmount = chauffeurSelected ? days * car.chauffeur_price_per_day : 0;
  const total = subtotal + chauffeurAmount;
  const upfront = Math.ceil(total * 0.3);
  const remaining = total - upfront;

  if (days < 1) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-500 text-center">
        Sélectionnez vos dates pour voir le prix
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
      <h4 className="font-semibold text-[#1a1f36]">Récapitulatif</h4>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">{days} jour{days > 1 ? 's' : ''} × {formatCurrency(car.price_per_day)}</span>
          <span className="font-medium">{formatCurrency(subtotal)}</span>
        </div>
        {chauffeurSelected && (
          <div className="flex justify-between">
            <span className="text-gray-500">Chauffeur ({days}j × {formatCurrency(car.chauffeur_price_per_day)})</span>
            <span className="font-medium">{formatCurrency(chauffeurAmount)}</span>
          </div>
        )}
      </div>
      <Separator />
      <div className="flex justify-between font-bold text-[#1a1f36]">
        <span>Total</span>
        <span>{formatCurrency(total)}</span>
      </div>
      <Separator />
      <div className="space-y-1 text-sm">
        <div className="flex justify-between text-amber-600">
          <span>Acompte à payer (30%)</span>
          <span className="font-semibold">{formatCurrency(upfront)}</span>
        </div>
        <div className="flex justify-between text-gray-500">
          <span>Reste à payer (70%)</span>
          <span>{formatCurrency(remaining)}</span>
        </div>
      </div>
    </div>
  );
}
