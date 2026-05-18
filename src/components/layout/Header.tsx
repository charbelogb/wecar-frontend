'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/cars', label: 'Nos voitures' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-[#1a1f36] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Car className="h-8 w-8 text-[#f59e0b]" />
            <span className="text-2xl font-bold text-white">WeCar</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors',
                  pathname === link.href ? 'text-[#f59e0b]' : 'text-gray-300 hover:text-[#f59e0b]'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link href="/request">
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-white/10">
                Décrire mon besoin
              </Button>
            </Link>
            <Link href="/cars">
              <Button size="sm" className="bg-[#f59e0b] hover:bg-[#f59e0b]/90 text-white">
                Voir les voitures
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-gray-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#1a1f36] border-t border-white/10 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'block py-2 text-sm',
                pathname === link.href ? 'text-[#f59e0b]' : 'text-gray-300 hover:text-[#f59e0b]'
              )}
            >
              {link.label}
            </Link>
          ))}
          <hr className="border-white/10" />
          <div className="flex flex-col space-y-2 pt-2">
            <Link href="/request" onClick={() => setMobileOpen(false)}>
              <Button variant="outline" size="sm" className="w-full border-white/30 text-gray-300 hover:bg-white/10">
                Décrire mon besoin
              </Button>
            </Link>
            <Link href="/cars" onClick={() => setMobileOpen(false)}>
              <Button size="sm" className="w-full bg-[#f59e0b] hover:bg-[#f59e0b]/90 text-white">
                Voir les voitures
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
