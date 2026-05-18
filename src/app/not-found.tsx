import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] px-4">
      <div className="text-center">
        <div className="text-8xl font-bold text-[#f59e0b] mb-4">404</div>
        <h2 className="text-2xl font-bold text-[#1a1f36] mb-2">Page introuvable</h2>
        <p className="text-gray-500 mb-6">La page que vous cherchez n&apos;existe pas ou a été déplacée.</p>
        <div className="flex gap-3 justify-center">
          <Link href="/">
            <Button className="bg-[#f59e0b] hover:bg-[#f59e0b]/90 text-white">Retour à l&apos;accueil</Button>
          </Link>
          <Link href="/cars">
            <Button variant="outline">Voir nos voitures</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
