'use client'

import { useState, useEffect } from 'react'
import DataTable from '@/components/DataTable'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from 'react-toastify'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Student, Classroom, Degree, BaseUrl } from '../base'


/*
We will allow adding user from a mentor page because a mentor can have multiple students 
If we allow adding student in this page, we need to assign a mentor using name in mentor 
dropdown which can contain repeat name. It's better to have a dedicated page for adding student
*/

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null)
  const [degrees, setDegrees] = useState<Degree[]>([])
  const [classrooms, setClassrooms] = useState<Classroom[]>([])

  // Fetch students, degrees, and classrooms data from the API
  useEffect(() => {
    const fetchData = async () => {
      const studentsResponse = await fetch(`${BaseUrl}/students`)
      const studentsData = await studentsResponse.json()
      setStudents(studentsData as Student[])

      const degreesResponse = await fetch(`${BaseUrl}/degrees`)
      const degreesData = await degreesResponse.json()
      setDegrees(degreesData as Degree[])

      const classroomsResponse = await fetch(`${BaseUrl}/classrooms`)
      const classroomsData = await classroomsResponse.json()
      setClassrooms(classroomsData as Classroom[])
    }
    fetchData()
  }, [])

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'first_name', label: 'First Name' },
    { key: 'last_name', label: 'Last Name' },
    { key: 'degree_id', label: 'Degree' },
    { key: 'classroom_id', label: 'Classroom' },
  ]



  const handleEdit = (student: Student) => {
    setCurrentStudent(student)
    setIsDialogOpen(true)
  }

  const handleDelete = async (student: Student) => {
    await fetch(`${BaseUrl}/students/${student.id}`, { method: 'DELETE' })
    setStudents(students.filter((s) => s.id !== student.id))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (currentStudent?.id) {
      // Edit student
      await fetch(`${BaseUrl}/students/${currentStudent.id}`, {
        method: 'PUT',
        body: JSON.stringify(currentStudent),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    } 

    // Refetch the updated list of students after the operation
    const response = await fetch(`${BaseUrl}/students`)
    const data = await response.json()
    setStudents(data)

    setIsDialogOpen(false)
    toast.success('You have successfully saved the student')
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Students</h1>
      <DataTable
        columns={columns}
        data={students}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="first_name">First Name</Label>
              <Input
                id="first_name"
                value={currentStudent?.first_name || ''}
                onChange={(e) => setCurrentStudent({ ...currentStudent, first_name: e.target.value } as Student)}
              />
            </div>
            <div>
              <Label htmlFor="last_name">Last Name</Label>
              <Input
                id="last_name"
                value={currentStudent?.last_name || ''}
                onChange={(e) => setCurrentStudent({ ...currentStudent, last_name: e.target.value } as Student)}
              />
            </div>
            <div>
              <Label htmlFor="birth_date">Birth Date</Label>
              <Input
                id="birth_date"
                type="date"
                value={currentStudent?.birth_date || ''}
                onChange={(e) => setCurrentStudent({ ...currentStudent, birth_date: e.target.value } as Student)}
              />
            </div>
            <div>
              <Label htmlFor="degree_id">Degree</Label>
              <Select
                value={currentStudent?.degree_id?.toString() || ''}
                onValueChange={(value) => setCurrentStudent({ ...currentStudent, degree_id: parseInt(value) } as Student)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a new Degree" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {degrees.map((degree) => (
                      <SelectItem key={degree.id} value={degree.id.toString()}>{degree.name}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="classroom_id">Classroom</Label>
              <Select
                value={currentStudent?.classroom_id?.toString() || ''}
                onValueChange={(value) => setCurrentStudent({ ...currentStudent, classroom_id: parseInt(value) } as Student)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a new Classroom" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {classrooms.map((classroom) => (
                      <SelectItem key={classroom.id} value={classroom.id.toString()}>{classroom.name}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit">Save</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
