'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableHead, TableHeader, TableBody, TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BaseUrl } from '../base';

interface Mentor {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

const MentorsList = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);

  useEffect(() => {
    axios.get(`${BaseUrl}/mentors`)
      .then(response => setMentors(response.data))
      .catch(error => console.error('Error fetching mentors:', error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Mentors List</h1>
      <Button asChild variant="default">
        <Link href="/mentors/create">Add Mentor</Link>
      </Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mentors.length > 0 ? (
            mentors.map(mentor => (
              <TableRow key={mentor.id}>
                <TableCell>{mentor.id}</TableCell>
                <TableCell>{mentor.first_name}</TableCell>
                <TableCell>{mentor.last_name}</TableCell>
                <TableCell>{mentor.email}</TableCell>
                <TableCell>{mentor.phone}</TableCell>
                <TableCell>
                  <Button asChild variant="outline">
                    <Link href={`/mentors/${mentor.id}`}>View</Link> 
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6}>No mentors available</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default MentorsList;
