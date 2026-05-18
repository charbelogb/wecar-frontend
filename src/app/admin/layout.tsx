'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Car, Calendar, Users, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/admin', label: 'Tableau de bord', icon: LayoutDashboard, exact: true },
  { href: '/admin/cars', label: 'Véhicules', icon: Car },
  { href: '/admin/bookings', label: 'Réservations', icon: Calendar },
  { href: '/admin/customers', label: 'Clients', icon: Users },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <aside className="hidden md:flex w-64 bg-[#1a1f36] flex-col">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-[#f59e0b]" />
            <h2 className="font-bold text-white">Administration</h2>
          </div>
          <p className="text-xs text-gray-400 mt-1">WeCar Admin Panel</p>
        </div>
        <nav className="p-3 flex-1">
          {navItems.map((item) => {
            const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors mb-1',
                  active ? 'bg-[#f59e0b] text-white' : 'text-gray-300 hover:bg-white/10 hover:text-white'
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/10">
          <Link href="/" className="text-xs text-gray-400 hover:text-white">← Retour au site</Link>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#1a1f36] border-t border-white/10 z-40">
        <div className="flex">
          {navItems.map((item) => {
            const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href} className={cn('flex-1 flex flex-col items-center py-2 text-xs', active ? 'text-[#f59e0b]' : 'text-gray-400')}>
                <item.icon className="h-5 w-5 mb-0.5" />
                {item.label.split(' ')[0]}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="flex-1 pb-16 md:pb-0 overflow-auto">{children}</div>
    </div>
  );
}
