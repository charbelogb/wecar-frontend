import Link from 'next/link';
import { ArrowRight, Shield, Clock, Award, Headphones, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CarCard from '@/components/cars/CarCard';
import { mockCars } from '@/lib/mock-data';

export default function HomePage() {
  const featuredCars = mockCars.filter((c) => c.status === 'active').slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1a1f36] to-[#2d3561] text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Louez votre voiture idéale
            <span className="text-[#f59e0b] block">au Bénin</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            WeCar vous propose les meilleurs véhicules à Cotonou et dans tout le Bénin. Service premium, chauffeur disponible, tarifs transparents.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/cars">
              <Button size="lg" className="bg-[#f59e0b] hover:bg-[#f59e0b]/90 text-white text-base px-8">
                Voir nos voitures <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#1a1f36] text-base px-8">
                Comment ça marche
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: '50+', label: 'Véhicules disponibles' },
            { value: '500+', label: 'Clients satisfaits' },
            { value: '4', label: 'Villes couvertes' },
            { value: '24/7', label: 'Support client' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-bold text-[#1a1f36]">{stat.value}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Cars */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-[#1a1f36]">Nos voitures vedettes</h2>
            <p className="text-gray-500 mt-1">Découvrez notre sélection premium</p>
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
      </section>

      {/* How it works */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#1a1f36] mb-12">Comment ça marche</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Choisissez', desc: 'Parcourez notre catalogue et trouvez le véhicule qui correspond à vos besoins et budget.', icon: '🚗' },
              { step: '02', title: 'Réservez', desc: 'Sélectionnez vos dates, votre lieu de prise en charge et payez l\'acompte de 30% en ligne.', icon: '📅' },
              { step: '03', title: 'Conduisez', desc: 'Récupérez votre véhicule à l\'heure convenue et profitez de votre location en toute sérénité.', icon: '🛣️' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="text-5xl mb-4">{item.icon}</div>
                <div className="text-[#f59e0b] font-bold text-sm mb-2">ÉTAPE {item.step}</div>
                <h3 className="text-xl font-bold text-[#1a1f36] mb-3">{item.title}</h3>
                <p className="text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/how-it-works">
              <Button variant="outline" className="border-[#1a1f36] text-[#1a1f36]">
                En savoir plus <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust signals */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-[#1a1f36] mb-12">Pourquoi choisir WeCar?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Shield, title: 'Sécurité garantie', desc: 'Tous nos véhicules sont assurés et contrôlés régulièrement.' },
            { icon: Clock, title: 'Service 24/7', desc: 'Notre équipe est disponible à toute heure pour vous assister.' },
            { icon: Award, title: 'Qualité premium', desc: 'Des véhicules récents, propres et parfaitement entretenus.' },
            { icon: Headphones, title: 'Support dédié', desc: 'Un conseiller personnel pour chaque réservation.' },
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
      </section>

      {/* CTA Footer Section */}
      <section className="bg-gradient-to-r from-[#1a1f36] to-[#2d3561] text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <CheckCircle className="h-12 w-12 text-[#f59e0b] mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Prêt à prendre la route?</h2>
          <p className="text-gray-300 mb-8 text-lg">Réservez dès maintenant et bénéficiez d&apos;une expérience de location sans stress.</p>
          <Link href="/cars">
            <Button size="lg" className="bg-[#f59e0b] hover:bg-[#f59e0b]/90 text-white px-10">
              Réserver ma voiture
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
