import React from 'react';
import Link from 'next/link';
import { Car, Phone, Mail, MapPin, Share2, MessageSquare, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1a1f36] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Car className="h-7 w-7 text-[#f59e0b]" />
              <span className="text-xl font-bold text-white">WeCar</span>
            </Link>
            <p className="text-sm text-gray-400">
              Location de voitures premium au Bénin. Service fiable, voitures de qualité pour tous vos déplacements.
            </p>
            <div className="flex space-x-3 mt-4">
              <a href="#" className="text-gray-400 hover:text-[#f59e0b] transition-colors"><Share2 className="h-5 w-5" /></a>
              <a href="#" className="text-gray-400 hover:text-[#f59e0b] transition-colors"><MessageSquare className="h-5 w-5" /></a>
              <a href="#" className="text-gray-400 hover:text-[#f59e0b] transition-colors"><Globe className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/cars" className="hover:text-[#f59e0b] transition-colors">Nos voitures</Link></li>
              <li><Link href="/how-it-works" className="hover:text-[#f59e0b] transition-colors">Comment ça marche</Link></li>
              <li><Link href="/faq" className="hover:text-[#f59e0b] transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-[#f59e0b] transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Légal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/mentions-legales" className="hover:text-[#f59e0b] transition-colors">Mentions légales</Link></li>
              <li><Link href="/cgu" className="hover:text-[#f59e0b] transition-colors">CGU</Link></li>
              <li><Link href="/confidentialite" className="hover:text-[#f59e0b] transition-colors">Confidentialité</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-[#f59e0b] mt-0.5 shrink-0" />
                <span>Rue de la Mer, Cotonou, Bénin</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-[#f59e0b] shrink-0" />
                <span>+229 97 00 00 00</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-[#f59e0b] shrink-0" />
                <span>contact@wecar.bj</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} WeCar. Tous droits réservés. Fait avec ❤️ au Bénin.</p>
        </div>
      </div>
    </footer>
  );
}
