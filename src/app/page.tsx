import Link from 'next/link';
import { ArrowRight, MessageCircle, CheckCircle, Shield, Clock, Award, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CarCard from '@/components/cars/CarCard';
import { mockCars } from '@/lib/mock-data';

export default function HomePage() {
  const featuredCars = mockCars.filter((c) => c.status === 'active').slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1a1f36] to-[#2d3561] text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-[#f59e0b]/20 text-[#f59e0b] text-sm font-semibold px-4 py-1 rounded-full mb-6">
            Location de voitures au Bénin
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Votre voiture idéale,
            <span className="text-[#f59e0b] block">confirmée sur WhatsApp</span>
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Parcourez notre sélection, envoyez votre demande en 2 minutes, on confirme la disponibilité et on s&apos;occupe du reste.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/cars">
              <Button size="lg" className="bg-[#f59e0b] hover:bg-[#f59e0b]/90 text-white text-base px-8 h-12">
                Voir nos voitures <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/request">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#1a1f36] text-base px-8 h-12">
                <MessageCircle className="mr-2 h-5 w-5" /> Décrire mon besoin
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-white border-b border-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { value: '50+', label: 'Véhicules disponibles' },
            { value: '500+', label: 'Clients satisfaits' },
            { value: '4', label: 'Villes couvertes' },
            { value: '24/7', label: 'Réponse WhatsApp' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-bold text-[#1a1f36]">{stat.value}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 bg-[#f8fafc]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-[#1a1f36]">Comment ça marche</h2>
            <p className="text-gray-500 mt-3 text-lg">Simple, rapide et sans mauvaise surprise</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                icon: '🔍',
                title: 'Parcourez ou décrivez',
                desc: 'Choisissez une voiture dans le catalogue ou décrivez votre besoin (dates, ville, budget).',
              },
              {
                step: '02',
                icon: '📋',
                title: 'Envoyez votre demande',
                desc: 'Remplissez le formulaire en 2 min. Aucun paiement à ce stade.',
              },
              {
                step: '03',
                icon: '💬',
                title: 'Confirmation WhatsApp',
                desc: 'Nous vérifions la disponibilité et vous confirmons par WhatsApp sous 2h.',
              },
              {
                step: '04',
                icon: '✅',
                title: 'Paiement & prise en charge',
                desc: 'Le paiement s\'effectue après confirmation. Votre véhicule vous attend.',
              },
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <div className="text-[#f59e0b] font-bold text-xs mb-2 tracking-wider">ÉTAPE {item.step}</div>
                <h3 className="text-base font-bold text-[#1a1f36] mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-[#1a1f36]">Véhicules en vedette</h2>
              <p className="text-gray-500 mt-1">Nos sélections les plus populaires</p>
            </div>
            <Link href="/cars">
              <Button variant="outline" className="hidden sm:flex">
                Voir tout <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
          <div className="text-center mt-6 sm:hidden">
            <Link href="/cars">
              <Button variant="outline">Voir toutes nos voitures</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why WeCar */}
      <section className="py-16 px-4 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#1a1f36] mb-12">Pourquoi choisir WeCar?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: 'Véhicules assurés', desc: 'Tous nos véhicules sont assurés et régulièrement entretenus.' },
              { icon: Clock, title: 'Réponse sous 2h', desc: 'Confirmation de disponibilité rapide via WhatsApp.' },
              { icon: Award, title: 'Qualité premium', desc: 'Des véhicules récents, propres et parfaitement préparés.' },
              { icon: Headphones, title: 'Accompagnement humain', desc: 'Un interlocuteur dédié pour chaque demande.' },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
                <div className="h-12 w-12 bg-[#f59e0b]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-6 w-6 text-[#f59e0b]" />
                </div>
                <h3 className="font-bold text-[#1a1f36] mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-[#1a1f36] to-[#2d3561] text-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <CheckCircle className="h-12 w-12 text-[#f59e0b] mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Prêt à réserver?</h2>
          <p className="text-gray-300 mb-8 text-lg max-w-xl mx-auto">
            Pas de carte bancaire requise pour démarrer. Envoyez votre demande, on vous répond par WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/cars">
              <Button size="lg" className="bg-[#f59e0b] hover:bg-[#f59e0b]/90 text-white px-10">
                Voir les voitures
              </Button>
            </Link>
            <Link href="/request">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#1a1f36] px-10">
                Décrire mon besoin
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
