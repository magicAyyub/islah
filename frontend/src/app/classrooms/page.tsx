'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { BaseUrl } from '../base';

interface Classroom {
  id: number;
  name: string;
}

import Link from 'next/link';
const ClassroomsList = () => {
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);

  useEffect(() => {
    axios.get(`${BaseUrl}/classrooms`)
      .then(response => setClassrooms(response.data))
      .catch(error => console.error('Error fetching classrooms:', error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Classrooms List</h1>
      <Button variant="default" asChild>
        <Link href="/classrooms/create">Add Classroom</Link>
      </Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Classroom Name</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {classrooms.length > 0 ?
          (
            classrooms.map(classroom => (
            <TableRow key={classroom.id}>
              <TableCell>{classroom.id}</TableCell>
              <TableCell>{classroom.name}</TableCell>
              <TableCell>
                <Button asChild variant="outline">
                  <Link href={`/classrooms/${classroom.id}`}>View</Link>
                </Button>
              </TableCell>
            </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center">No classrooms found</TableCell>
            </TableRow>
          )}
        </TableBody>  
      </Table>
    </div>
  );
};

export default ClassroomsList;