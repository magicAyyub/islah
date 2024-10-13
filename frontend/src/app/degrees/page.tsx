'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BaseUrl } from '../base';

interface Degree {
  id: number;
  name: string;
}

const DegreesList = () => {
  const [degrees, setDegrees] = useState<Degree[]>([]);

  useEffect(() => {
    axios.get(`${BaseUrl}/degrees`)
      .then(response => setDegrees(response.data))
      .catch(error => console.error('Error fetching degrees:', error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Degrees List</h1>
      <Button asChild variant="default">
        <Link href="/degrees/create">Add Degree</Link>
      </Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Degree Name</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {degrees.length > 0 ?
          (
            degrees.map(degree => (
            <TableRow key={degree.id}>
              <TableCell>{degree.id}</TableCell>
              <TableCell>{degree.name}</TableCell>
              <TableCell>
                <Button asChild variant="outline">
                  <Link href={`/degrees/${degree.id}`}>View</Link>
                </Button>
              </TableCell>
            </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center">No degrees found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DegreesList;