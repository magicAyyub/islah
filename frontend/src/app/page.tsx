import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, GraduationCap, School, BookOpen, Calendar, CreditCard } from 'lucide-react'

export default function Dashboard() {
  const stats = [
    { name: 'Total Students', value: '1,234', icon: Users },
    { name: 'Total Mentors', value: '56', icon: Users },
    { name: 'Degrees', value: '12', icon: GraduationCap },
    { name: 'Classrooms', value: '24', icon: School },
    { name: 'Courses', value: '48', icon: BookOpen },
    { name: 'Attendance Rate', value: '95%', icon: Calendar },
    { name: 'Total Payments', value: '$123,456', icon: CreditCard },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}