'use client'

import Layout from '@/components/Layout';
import { FaUsers, FaChalkboardTeacher, FaUniversity, FaMoneyBill } from 'react-icons/fa';

interface Stat {
  title: string;
  count: number;
  icon: React.ReactNode;
}
  
const Dashboard = () => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard 
          title="Students" 
          count={150} 
          icon={<FaUsers className="text-3xl text-blue-600" />} 
        />
        <StatCard 
          title="Mentors" 
          count={20} 
          icon={<FaChalkboardTeacher className="text-3xl text-green-600" />} 
        />
        <StatCard 
          title="Degrees" 
          count={5} 
          icon={<FaUniversity className="text-3xl text-purple-600" />} 
        />
        <StatCard 
          title="Payments" 
          count={300} 
          icon={<FaMoneyBill className="text-3xl text-yellow-600" />} 
        />
      </div>

      {/* Placeholder for more content (charts, latest actions, etc.) */}
      <div className="bg-white p-6 rounded-md shadow-md">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <p>Display latest student registrations, mentor assignments, and payments here.</p>
      </div>
    </Layout>
  );
};

export default Dashboard;

// StatCard Component
const StatCard = ({ title, count, icon }: Stat) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
    <div>
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-2xl font-semibold">{count}</p>
    </div>
    <div>{icon}</div>
  </div>
);
