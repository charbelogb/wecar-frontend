import { Search, Calendar, CreditCard, Car } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Comment ça marche - WeCar',
};

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Choisissez votre véhicule',
    description: 'Parcourez notre catalogue de véhicules et filtrez selon vos critères: catégorie, ville, transmission, budget. Consultez les photos, les détails techniques et les tarifs.',
    details: ['Plus de 50 véhicules disponibles', 'Filtres avancés pour trouver rapidement', 'Photos HD de chaque voiture', 'Tarifs transparents tout inclus'],
  },
  {
    number: '02',
    icon: Calendar,
    title: 'Sélectionnez vos dates',
    description: 'Choisissez vos dates de début et de fin de location, ainsi que votre lieu de prise en charge. Optez pour un chauffeur si vous le souhaitez.',
    details: ['Calendrier de disponibilité en temps réel', 'Option chauffeur disponible', 'Lieu de prise en charge au choix', 'Notes et demandes spéciales acceptées'],
  },
  {
    number: '03',
    icon: CreditCard,
    title: 'Payez l\'acompte',
    description: 'Confirmez votre réservation en payant un acompte de 30% du montant total. Le reste est réglé à la prise en charge du véhicule.',
    details: ['Acompte de 30% seulement', 'Paiement sécurisé en ligne', 'Confirmation immédiate par email', 'Remboursement si annulation 48h avant'],
  },
  {
    number: '04',
    icon: Car,
    title: 'Profitez de votre location',
    description: 'Récupérez votre véhicule à l\'heure et au lieu convenus, réglez le solde restant, et partez en toute sérénité. Notre équipe reste disponible 24/7.',
    details: ['Prise en charge à l\'heure convenue', 'Véhicule propre et révisé', 'Support 24/7 pendant la location', 'Restitution simple et rapide'],
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="bg-[#1a1f36] text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Comment ça marche</h1>
          <p className="text-gray-300 text-lg">Louer une voiture avec WeCar est simple, rapide et transparent.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16 space-y-12">
        {steps.map((step, index) => (
          <div key={step.number} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}>
            <div className="flex-1">
              <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 bg-[#f59e0b]/10 rounded-full flex items-center justify-center">
                    <step.icon className="h-6 w-6 text-[#f59e0b]" />
                  </div>
                  <div>
                    <span className="text-[#f59e0b] text-sm font-bold">ÉTAPE {step.number}</span>
                    <h2 className="text-xl font-bold text-[#1a1f36]">{step.title}</h2>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{step.description}</p>
                <ul className="space-y-2">
                  {step.details.map((detail) => (
                    <li key={detail} className="flex items-center gap-2 text-sm text-gray-500">
                      <span className="h-1.5 w-1.5 bg-[#f59e0b] rounded-full shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="hidden md:flex items-center justify-center w-16 shrink-0">
              <div className="h-16 w-16 rounded-full bg-[#1a1f36] flex items-center justify-center text-white text-2xl font-bold">
                {step.number}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#1a1f36] text-white py-12 px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Prêt à commencer?</h2>
        <p className="text-gray-300 mb-6">Trouvez votre véhicule idéal parmi notre flotte.</p>
        <Link href="/cars">
          <Button className="bg-[#f59e0b] hover:bg-[#f59e0b]/90 text-white px-8">
            Voir nos voitures
          </Button>
        </Link>
      </div>
    </div>
  );
}
