import { FaUsers, FaChalkboardTeacher, FaUniversity, FaBook, FaMoneyBill } from 'react-icons/fa';

export const Sidebar = () => {
  return (
    <div className="w-64 bg-white shadow-md">
      <div className="p-4 font-bold text-xl text-center">School Dashboard</div>
      <nav className="mt-10">
        <a href="/students" className="block py-2.5 px-4 text-gray-700 hover:bg-gray-200">
          <FaUsers className="inline mr-2"/> Students
        </a>
        <a href="/mentors" className="block py-2.5 px-4 text-gray-700 hover:bg-gray-200">
          <FaChalkboardTeacher className="inline mr-2"/> Mentors
        </a>
        <a href="/degrees" className="block py-2.5 px-4 text-gray-700 hover:bg-gray-200">
          <FaUniversity className="inline mr-2"/> Degrees
        </a>
        <a href="/classrooms" className="block py-2.5 px-4 text-gray-700 hover:bg-gray-200">
          <FaBook className="inline mr-2"/> Classrooms
        </a>
        <a href="/payments" className="block py-2.5 px-4 text-gray-700 hover:bg-gray-200">
          <FaMoneyBill className="inline mr-2"/> Payments
        </a>
      </nav>
    </div>
  );
};


