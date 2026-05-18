import Link from 'next/link';
import { mockBookings } from '@/lib/mock-data';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const statusLabels: Record<string, string> = {
  pending: 'En attente',
  paid: 'Payé',
  confirmed: 'Confirmé',
  cancelled: 'Annulé',
  completed: 'Terminé',
};

const statusVariants: Record<string, 'default' | 'warning' | 'success' | 'destructive' | 'secondary'> = {
  pending: 'warning',
  paid: 'default',
  confirmed: 'success',
  cancelled: 'destructive',
  completed: 'secondary',
};

export default function AdminBookingsPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1a1f36]">Gestion des réservations</h1>
        <p className="text-gray-500">{mockBookings.length} réservations au total</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Toutes les réservations</CardTitle></CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Véhicule</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Statut réservation</TableHead>
                <TableHead>Statut paiement</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-mono text-xs">{booking.id}</TableCell>
                  <TableCell>
                    <p className="font-medium text-sm">{booking.car?.title}</p>
                    <p className="text-xs text-gray-400">{booking.pickup_location}</p>
                  </TableCell>
                  <TableCell className="text-sm">
                    <p>{formatDate(booking.start_date)}</p>
                    <p className="text-gray-400">→ {formatDate(booking.end_date)}</p>
                  </TableCell>
                  <TableCell className="font-medium">{formatCurrency(booking.total_amount)}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariants[booking.booking_status]}>
                      {statusLabels[booking.booking_status]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={booking.payment_status === 'successful' ? 'success' : booking.payment_status === 'pending' ? 'warning' : 'destructive'}>
                      {booking.payment_status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Link href={`/admin/bookings/${booking.id}`} className="text-[#f59e0b] hover:underline text-sm">
                      Détails
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
