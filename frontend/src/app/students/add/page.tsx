'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Student, Classroom, Degree, BaseUrl } from '../../base'
import { Toaster, toast } from 'react-hot-toast'

export default function AddStudentPage() {
  const [student, setStudent] = useState<Student>({} as Student)
  const [degrees, setDegrees] = useState<Degree[]>([])
  const [classrooms, setClassrooms] = useState<Classroom[]>([])
  const router = useRouter()
  const searchParams = useSearchParams()
  const mentorId = searchParams.get('mentor_id')

  useEffect(() => {
    const fetchData = async () => {
      toast.promise(
        Promise.all([
          fetch(`${BaseUrl}/degrees`),
          fetch(`${BaseUrl}/classrooms`)
        ]),
        {
          loading: 'Loading data...',
          success: 'Data loaded successfully',
          error: 'Failed to load data',
        }
      ).then(async ([degreesRes, classroomsRes]) => {
        const [degreesData, classroomsData] = await Promise.all([
          degreesRes.json(),
          classroomsRes.json()
        ])

        setDegrees(degreesData)
        setClassrooms(classroomsData)
        setStudent(prev => ({ ...prev, mentor_id: parseInt(mentorId || '0'), state: 'active' }))
      }).catch((error) => {
        console.error('Error fetching data:', error)
      })
    }

    fetchData()
  }, [mentorId])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    toast.promise(
      fetch(`${BaseUrl}/students`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
      }),
      {
        loading: 'Adding student...',
        success: 'Student added successfully!',
        error: 'Failed to add student',
      }
    ).then((response) => {
      if (!response.ok) {
        throw new Error('Failed to add student')
      }
      router.push('/students')
    }).catch((error) => {
      console.error('Error adding student:', error)
    })
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Toaster position="top-right" toastOptions={{
        className: 'bg-background text-foreground',
        style: {
          border: '1px solid var(--border)',
          padding: '16px',
          color: 'var(--foreground)',
        },
      }} />
      <h1 className="text-3xl font-bold mb-6">Add New Student</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="first_name">First Name</Label>
          <Input
            id="first_name"
            value={student.first_name || ''}
            onChange={(e) => setStudent({ ...student, first_name: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="last_name">Last Name</Label>
          <Input
            id="last_name"
            value={student.last_name || ''}
            onChange={(e) => setStudent({ ...student, last_name: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="birth_date">Birth Date</Label>
          <Input
            id="birth_date"
            type="date"
            value={student.birth_date || ''}
            onChange={(e) => setStudent({ ...student, birth_date: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="degree_id">Degree</Label>
          <Select
            value={student.degree_id?.toString() || ''}
            onValueChange={(value) => setStudent({ ...student, degree_id: parseInt(value) })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a Degree" />
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
            value={student.classroom_id?.toString() || ''}
            onValueChange={(value) => setStudent({ ...student, classroom_id: parseInt(value) })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a Classroom" />
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
        {mentorId && (
          <div>
            <Label htmlFor="mentor_id">Mentor</Label>
            <Input
              id="mentor_id"
              value={student.mentor_id?.toString() || ''}
              onChange={(e) => setStudent({ ...student, mentor_id: parseInt(e.target.value) })}
              disabled
            />
          </div>
        )}
        <Button type="submit">Add Student</Button>
      </form>
    </div>
  )
}