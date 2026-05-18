import Link from 'next/link';
import { Car, Calendar, Users, TrendingUp, Plus } from 'lucide-react';
import { mockCars, mockBookings, mockUsers } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function AdminDashboard() {
  const totalRevenue = mockBookings.reduce((sum, b) => sum + b.total_amount, 0);
  const activeCars = mockCars.filter((c) => c.status === 'active').length;
  const confirmedBookings = mockBookings.filter((b) => b.booking_status === 'confirmed').length;
  const customers = mockUsers.filter((u) => u.role === 'customer').length;

  const stats = [
    { label: 'Véhicules actifs', value: activeCars, icon: Car, href: '/admin/cars', color: 'text-blue-500', bg: 'bg-blue-100' },
    { label: 'Réservations confirmées', value: confirmedBookings, icon: Calendar, href: '/admin/bookings', color: 'text-green-500', bg: 'bg-green-100' },
    { label: 'Clients', value: customers, icon: Users, href: '/admin/customers', color: 'text-purple-500', bg: 'bg-purple-100' },
    { label: 'Chiffre d\'affaires', value: formatCurrency(totalRevenue), icon: TrendingUp, href: '/admin/bookings', color: 'text-amber-500', bg: 'bg-amber-100' },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1a1f36]">Tableau de bord</h1>
          <p className="text-gray-500">Vue d&apos;ensemble de WeCar</p>
        </div>
        <Link href="/admin/cars/new">
          <Button className="bg-[#f59e0b] hover:bg-[#f59e0b]/90 text-white">
            <Plus className="h-4 w-4 mr-2" /> Ajouter un véhicule
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="flex items-center gap-4 p-4">
                <div className={`h-10 w-10 ${stat.bg} rounded-full flex items-center justify-center shrink-0`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div>
                  <div className="text-xl font-bold text-[#1a1f36]">{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Dernières réservations</CardTitle>
            <Link href="/admin/bookings"><Button variant="ghost" size="sm">Voir tout</Button></Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockBookings.slice(0, 3).map((b) => (
                <div key={b.id} className="flex justify-between items-center text-sm">
                  <div>
                    <p className="font-medium">{b.car?.title}</p>
                    <p className="text-gray-400 text-xs">{b.start_date} → {b.end_date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{formatCurrency(b.total_amount)}</p>
                    <Badge variant={b.booking_status === 'confirmed' ? 'success' : b.booking_status === 'pending' ? 'warning' : 'secondary'} className="text-xs">
                      {b.booking_status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Car inventory */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Inventaire véhicules</CardTitle>
            <Link href="/admin/cars"><Button variant="ghost" size="sm">Gérer</Button></Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockCars.slice(0, 4).map((c) => (
                <div key={c.id} className="flex justify-between items-center text-sm">
                  <div>
                    <p className="font-medium">{c.title}</p>
                    <p className="text-gray-400 text-xs">{c.category} • {c.city}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{formatCurrency(c.price_per_day)}/j</p>
                    <Badge variant={c.status === 'active' ? 'success' : 'secondary'} className="text-xs">{c.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
