'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Calendar, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', label: 'Vue d\'ensemble', icon: LayoutDashboard, exact: true },
  { href: '/dashboard/bookings', label: 'Mes réservations', icon: Calendar },
  { href: '/dashboard/profile', label: 'Mon profil', icon: User },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-60 bg-white border-r border-gray-200 flex-col">
        <div className="p-6 border-b border-gray-200">
          <h2 className="font-bold text-[#1a1f36]">Espace client</h2>
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
                  active ? 'bg-[#1a1f36] text-white' : 'text-gray-600 hover:bg-gray-100'
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
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

      <div className="flex-1 pb-16 md:pb-0">{children}</div>
    </div>
  );
}
