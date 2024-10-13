'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BaseUrl } from '../base';

interface Course {
  id: number;
  name: string;
}

const CoursesList = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    axios.get(`${BaseUrl}/courses`)
      .then(response => setCourses(response.data))
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Courses List</h1>
      <Button asChild variant="default">
        <Link href="/courses/create">Add Course</Link>
      </Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Course Name</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.length > 0 ?
          (
            courses.map(course => (
            <TableRow key={course.id}>
              <TableCell>{course.id}</TableCell>
              <TableCell>{course.name}</TableCell>
            </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center">No courses found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CoursesList;
