import Link from 'next/link'
import { Home, Users, GraduationCap, School, BookOpen, Calendar, CreditCard } from 'lucide-react'

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', icon: Home, href: '/' },
    { name: 'Students', icon: Users, href: '/students' },
    { name: 'Mentors', icon: Users, href: '/mentors' },
    { name: 'Degrees', icon: GraduationCap, href: '/degrees' },
    { name: 'Classrooms', icon: School, href: '/classrooms' },
    { name: 'Courses', icon: BookOpen, href: '/courses' },
    { name: 'Attendances', icon: Calendar, href: '/attendances' },
    { name: 'Payments', icon: CreditCard, href: '/payments' },
  ]

  return (
    <div className="flex flex-col w-64 bg-white shadow-lg">
      <div className="flex items-center justify-center h-20 shadow-md">
        <h1 className="text-3xl font-bold text-blue-600">SMS</h1>
      </div>
      <ul className="flex flex-col py-4">
        {menuItems.map((item) => (
          <li key={item.name}>
            <Link href={item.href} className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100">
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar