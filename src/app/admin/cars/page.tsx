import Link from 'next/link';
import Image from 'next/image';
import { Plus, Pencil } from 'lucide-react';
import { mockCars } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminCarsPage() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1a1f36]">Gestion des véhicules</h1>
          <p className="text-gray-500">{mockCars.length} véhicules au total</p>
        </div>
        <Link href="/admin/cars/new">
          <Button className="bg-[#f59e0b] hover:bg-[#f59e0b]/90 text-white">
            <Plus className="h-4 w-4 mr-2" /> Ajouter un véhicule
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader><CardTitle>Liste des véhicules</CardTitle></CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Véhicule</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Ville</TableHead>
                <TableHead>Prix/jour</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockCars.map((car) => (
                <TableRow key={car.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-14 rounded overflow-hidden shrink-0">
                        <Image src={car.main_image_url} alt={car.title} fill className="object-cover" sizes="56px" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{car.title}</p>
                        <p className="text-xs text-gray-400">{car.year}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell><Badge variant="secondary">{car.category}</Badge></TableCell>
                  <TableCell className="text-sm">{car.city}</TableCell>
                  <TableCell className="font-medium text-sm">{formatCurrency(car.price_per_day)}</TableCell>
                  <TableCell>
                    <Badge variant={car.status === 'active' ? 'success' : car.status === 'draft' ? 'warning' : 'secondary'}>
                      {car.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Link href={`/admin/cars/${car.id}/edit`}>
                      <Button variant="ghost" size="sm">
                        <Pencil className="h-4 w-4" />
                      </Button>
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
