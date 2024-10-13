'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BaseUrl } from '../base';

interface Student {
    id: number;
    first_name: string;
    last_name: string;
    birth_date: string;
    state: string;
}

const StudentsList = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/students`); // Requête vers ton backend FastAPI
        if (Array.isArray(response.data)) {
          setStudents(response.data);  // Gérer les données en tant que tableau
        } else {
          setError("Unexpected response format");
        }
      } catch (error) {
        console.error("Error fetching students:", error);
        setError("Failed to fetch students");
      }
    };

    fetchStudents();
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Students List</h1>
      <Button variant="default" asChild>
        <Link href="/students/create">Add Student</Link>
      </Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Birth Date</TableHead>
            <TableHead>State</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.length > 0 ?
          (
            students.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.id}</TableCell>
              <TableCell>{student.first_name}</TableCell>
              <TableCell>{student.last_name}</TableCell>
              <TableCell>{student.birth_date}</TableCell>
              <TableCell>{student.state}</TableCell>
              <TableCell>
                <Button variant="outline">View</Button>
              </TableCell>
            </TableRow>
          ))  
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center">No students found</TableCell>
            </TableRow>
          )}  
        </TableBody>
      </Table>
    </div>
  );
};

export default StudentsList;
