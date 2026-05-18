'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X, Car, ChevronDown, User, LogOut, Calendar, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
    setUserMenuOpen(false);
  };

  const navLinks = [
    { href: '/cars', label: 'Nos voitures' },
    { href: '/how-it-works', label: 'Comment ça marche' },
    { href: '/faq', label: 'FAQ' },
    { href: '/contact', label: 'Contact' },
  ];

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
              <Link key={link.href} href={link.href} className="text-gray-300 hover:text-[#f59e0b] transition-colors text-sm font-medium">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Auth / User */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                >
                  <div className="h-8 w-8 rounded-full bg-[#f59e0b] flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm">{user.full_name.split(' ')[0]}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    {user.role === 'admin' && (
                      <Link href="/admin" onClick={() => setUserMenuOpen(false)} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <Settings className="h-4 w-4 mr-2" /> Administration
                      </Link>
                    )}
                    <Link href="/dashboard" onClick={() => setUserMenuOpen(false)} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <User className="h-4 w-4 mr-2" /> Mon profil
                    </Link>
                    <Link href="/dashboard/bookings" onClick={() => setUserMenuOpen(false)} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <Calendar className="h-4 w-4 mr-2" /> Mes réservations
                    </Link>
                    <hr className="my-1" />
                    <button onClick={handleLogout} className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                      <LogOut className="h-4 w-4 mr-2" /> Déconnexion
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-white/10">
                    Connexion
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button size="sm" className="bg-[#f59e0b] hover:bg-[#f59e0b]/90 text-white">
                    S&apos;inscrire
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-gray-300 hover:text-white"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#1a1f36] border-t border-white/10 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="block text-gray-300 hover:text-[#f59e0b] py-2 text-sm">
              {link.label}
            </Link>
          ))}
          <hr className="border-white/10" />
          {user ? (
            <>
              {user.role === 'admin' && (
                <Link href="/admin" onClick={() => setMobileOpen(false)} className="block text-gray-300 hover:text-white py-2 text-sm">Administration</Link>
              )}
              <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="block text-gray-300 hover:text-white py-2 text-sm">Mon profil</Link>
              <Link href="/dashboard/bookings" onClick={() => setMobileOpen(false)} className="block text-gray-300 hover:text-white py-2 text-sm">Mes réservations</Link>
              <button onClick={handleLogout} className="block w-full text-left text-red-400 hover:text-red-300 py-2 text-sm">Déconnexion</button>
            </>
          ) : (
            <div className="flex space-x-3 pt-2">
              <Link href="/auth/login" onClick={() => setMobileOpen(false)}>
                <Button variant="outline" size="sm" className="border-white/30 text-gray-300 hover:bg-white/10">Connexion</Button>
              </Link>
              <Link href="/auth/register" onClick={() => setMobileOpen(false)}>
                <Button size="sm" className="bg-[#f59e0b] text-white">S&apos;inscrire</Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
