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