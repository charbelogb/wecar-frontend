import { Metadata } from 'next';
import CustomRequestForm from './CustomRequestForm';

export const metadata: Metadata = {
  title: 'Décrire mon besoin - WeCar',
  description: 'Décrivez votre besoin de location et notre équipe vous propose le véhicule parfait.',
};

export default function RequestPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1a1f36] to-[#2d3561] text-white py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block bg-[#f59e0b]/20 text-[#f59e0b] text-sm font-semibold px-4 py-1 rounded-full mb-5">
            Besoin personnalisé
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Vous ne savez pas quelle voiture choisir?
          </h1>
          <p className="text-gray-300 text-lg max-w-xl mx-auto">
            Dites-nous ce qu&apos;il vous faut — dates, ville, budget, usage — et on vous propose le véhicule idéal.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* How it works mini */}
        <div className="grid grid-cols-3 gap-4 mb-10 text-center">
          {[
            { icon: '📋', label: 'Décrivez votre besoin' },
            { icon: '💬', label: 'On vous répond par WhatsApp' },
            { icon: '✅', label: 'Vous confirmez & payez' },
          ].map((step) => (
            <div key={step.label} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
              <div className="text-3xl mb-2">{step.icon}</div>
              <p className="text-xs text-gray-600 font-medium">{step.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="font-bold text-[#1a1f36] text-lg mb-1">Mon besoin de location</h2>
          <p className="text-sm text-gray-500 mb-6">
            Tous les champs marqués * sont requis. Aucun paiement à ce stade.
          </p>
          <CustomRequestForm />
        </div>
      </div>
    </div>
  );
}
