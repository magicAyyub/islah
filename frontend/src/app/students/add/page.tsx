'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'
import { Student, Classroom, Degree, BaseUrl } from '../../base'
import { Toaster, toast } from 'react-hot-toast'

export default function AddStudentPage() {
  const [student, setStudent] = useState<Student>({} as Student)
  const [degrees, setDegrees] = useState<Degree[]>([])
  const [classrooms, setClassrooms] = useState<Classroom[]>([])
  const [birthDate, setBirthDate] = useState<Date>()
  const router = useRouter()
  const searchParams = useSearchParams()
  const mentorId = searchParams.get('mentor_id')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [degreesRes, classroomsRes] = await Promise.all([
          fetch(`${BaseUrl}/degrees`),
          fetch(`${BaseUrl}/classrooms`)
        ]);
        const [degreesData, classroomsData] = await Promise.all([
          degreesRes.json(),
          classroomsRes.json()
        ]);

        setDegrees(degreesData);
        setClassrooms(classroomsData);
        setStudent(prev => ({ ...prev, mentor_id: parseInt(mentorId || '0'), state: 'active' }));
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
        toast.error('Échec du chargement des données');
      }
    };

    fetchData()
  }, [mentorId])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!student.first_name || !student.last_name || !student.birth_date || !student.degree_id || !student.classroom_id) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }
    try {
      const response = await fetch(`${BaseUrl}/students`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
      });
      if (!response.ok) {
        throw new Error('Échec de l\'ajout de l\'étudiant');
      }
      toast.success('Étudiant ajouté avec succès !');
      router.push('/students');
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'étudiant:', error);
      toast.error('Échec de l\'ajout de l\'étudiant');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      <Card className="w-full max-w-md mx-auto">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Ajouter un nouvel étudiant</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Prénom</Label>
              <Input
                id="firstName"
                placeholder="Entrez le prénom"
                value={student.first_name || ''}
                onChange={(e) => setStudent({ ...student, first_name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Nom</Label>
              <Input
                id="lastName"
                placeholder="Entrez le nom"
                value={student.last_name || ''}
                onChange={(e) => setStudent({ ...student, last_name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="birthDate">Date de naissance</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="birthDate"
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !birthDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {birthDate ? format(birthDate, "P") : "Sélectionnez une date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={birthDate}
                    onSelect={(date) => {
                      setBirthDate(date)
                      if (date) {
                        setStudent({ ...student, birth_date: format(date, 'yyyy-MM-dd') })
                      }
                    }}
                    className="w-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="degree">Diplôme</Label>
              <Select onValueChange={(value) => setStudent({ ...student, degree_id: parseInt(value) })}>
                <SelectTrigger id="degree">
                  <SelectValue placeholder="Sélectionnez un diplôme" />
                </SelectTrigger>
                <SelectContent>
                  {degrees.map((degree) => (
                    <SelectItem key={degree.id} value={degree.id.toString()}>{degree.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="classroom">Classe</Label>       
              <Select onValueChange={(value) => setStudent({ ...student, classroom_id: parseInt(value) })}>
                <SelectTrigger id="classroom">
                  <SelectValue placeholder="Sélectionnez une classe" />
                </SelectTrigger>
                <SelectContent>
                  {classrooms.map((classroom) => (
                    <SelectItem key={classroom.id} value={classroom.id.toString()}>{classroom.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full"
              type="submit"
            >
              Ajouter l&apos;étudiant
            </Button>
          </CardFooter>
        </form>
      </Card>
      <Toaster />
    </div>
  )
}