'use client'

import { useState, useEffect } from 'react'
import DataTable from '@/components/DataTable'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BaseUrl, Mentor } from '../base'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'

export default function MentorsPage() {
  const [mentors, setMentors] = useState<Mentor[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentMentor, setCurrentMentor] = useState<Mentor | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
        const response = await fetch(`${BaseUrl}/mentors`)
        const data = await response.json()
        setMentors(data as Mentor[])
    }
    fetchData()
  }, [])

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'first_name', label: 'First Name' },
    { key: 'last_name', label: 'Last Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
  ] 

  const handleEdit = (mentor: Mentor) => {
    setCurrentMentor(mentor)
    setIsDialogOpen(true)
  }

  const handleDelete = async (mentor: Mentor) => {
    await fetch(`${BaseUrl}/mentors/${mentor.id}`, { method: 'DELETE' })
    setMentors(mentors.filter((m) => m.id !== mentor.id))
  }

  const handleAdd = () => {
    setCurrentMentor(null)
    setIsDialogOpen(true)
  } 

  const handleAddStudent = async (mentor: Mentor) => {
    // redirect to the students page
    router.push(`/students/add?mentor_id=${mentor.id}`)
  } 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (currentMentor?.id) {
      // Edit mentor
      await fetch(`${BaseUrl}/mentors/${currentMentor.id}`, {
        method: 'PUT',
        body: JSON.stringify(currentMentor),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    } 
    else {
      // Add mentor
      await fetch(`${BaseUrl}/mentors`, {
        method: 'POST',
        body: JSON.stringify(currentMentor),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }

    // Refetch the updated list of students after the operation
    const response = await fetch(`${BaseUrl}/mentors`)
    const data = await response.json()
    setMentors(data)

    setIsDialogOpen(false)
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
    <Sidebar
      activeTab="Mentors"
    />
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
     <Header />
      <DataTable
        columns={columns}
        data={mentors}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAddStudent={handleAddStudent}
      />
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Mentor</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="first_name">First Name</Label>
              <Input
                id="first_name"
                value={currentMentor?.first_name || ''}
                onChange={(e) => setCurrentMentor({ ...currentMentor, first_name: e.target.value } as Mentor)}
              />
            </div>
            <div>
              <Label htmlFor="last_name">Last Name</Label>
              <Input
                id="last_name"
                value={currentMentor?.last_name || ''}
                onChange={(e) => setCurrentMentor({ ...currentMentor, last_name: e.target.value } as Mentor)}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={currentMentor?.email || ''}
                onChange={(e) => setCurrentMentor({ ...currentMentor, email: e.target.value } as Mentor)}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={currentMentor?.phone || ''}
                onChange={(e) => setCurrentMentor({ ...currentMentor, phone: e.target.value } as Mentor)}
              />
            </div>  
            <Button type="submit">Save</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  </div>
  )
}
