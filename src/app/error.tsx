'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-[50vh] px-4">
      <div className="text-center">
        <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">⚠️</span>
        </div>
        <h2 className="text-xl font-bold text-[#1a1f36] mb-2">Une erreur est survenue</h2>
        <p className="text-gray-500 mb-4">Désolé, une erreur inattendue s&apos;est produite.</p>
        <Button onClick={reset} className="bg-[#f59e0b] hover:bg-[#f59e0b]/90 text-white">Réessayer</Button>
      </div>
    </div>
  );
}
