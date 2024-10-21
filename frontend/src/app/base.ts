import { Home, Users, GraduationCap, School, BookOpen, Calendar, CreditCard } from 'lucide-react';
export const BaseUrl = 'http://localhost:8000';

export type Student = {
    id?: number
    first_name: string
    last_name: string
    birth_date: string
    degree_id: number
    classroom_id: number
    mentor_id: number
    state: string
  }

export type Classroom = {
    id: number
    name: string
    degree_id: number
    capacity: number
    day: string
    time_slot: string
}

export type Degree = {
    id: number
    name: string
    level: string
}

export type Mentor = {
    id: number
    first_name: string
    last_name: string
    email: string
    phone: string
}   

export type Course = {
    id?: number
    name: string
    description: string
    duration: number
    degree_id: number
}

export type Attendance = {
    id?: number
    student_id: number
    course_id: number
    date: string
}

export type Payment = {
    id?: number
    amount: number
    date: string
    mentor_id: number
}

export const menuItems = [
    { name: 'Dashboard', icon: Home, href: '/'},
    { name: 'Students', icon: Users, href: '/students' },
    { name: 'Mentors', icon: Users, href: '/mentors' },
    { name: 'Degrees', icon: GraduationCap, href: '/degrees' },
    { name: 'Classrooms', icon: School, href: '/classrooms' },
    { name: 'Courses', icon: BookOpen, href: '/courses' },
    { name: 'Attendances', icon: Calendar, href: '/attendances' },
    { name: 'Payments', icon: CreditCard, href: '/payments' },
  ]