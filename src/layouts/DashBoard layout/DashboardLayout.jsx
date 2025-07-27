import React, { useState } from "react";
import { Link, Outlet } from "react-router";
import { Menu } from "lucide-react";
import useUserRole from "../../hooks/useUserRole";
import {
  FaHome,
  FaTasks,
  FaUserCircle,
  FaMoneyBillWave,
  FaUsers,
  FaRegChartBar,
  FaClipboardCheck,
  FaUserShield,
  FaCoins,
} from 'react-icons/fa';


const DashboardLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { role, roleLoading } = useUserRole();
  // console.log(role)

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile Drawer Toggle */}
      <div className="md:hidden absolute top-4 left-4 z-50">
        <button
          onClick={() => setDrawerOpen(!drawerOpen)}
          className="text-gray-700 focus:outline-none"
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Sidebar Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md border-r transform z-40 transition-transform duration-300 ease-in-out
        ${drawerOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:relative md:block`}
      >
        <div className="p-4 text-center border-b bg-blue-50">
          <h2 className="text-xl font-bold text-blue-600">Dashboard</h2>
        </div>
        <nav className="flex flex-col p-4 space-y-2">
          
          <Link
  to="/"
  className="flex items-center gap-2 px-4 py-2 rounded hover:bg-blue-100 text-gray-700 font-medium"
  onClick={() => setDrawerOpen(false)}
>
  <FaHome /> HOME
</Link>

<Link
  to="/dashboard/profile"
  className="flex items-center gap-2 px-4 py-2 rounded hover:bg-blue-100 text-gray-700 font-medium"
  onClick={() => setDrawerOpen(false)}
>
  <FaUserCircle /> MY PROFILE
</Link>

{ 

!roleLoading && role === "Employee" && 
  <>
  <Link
  to="/dashboard/work"
  className="flex items-center gap-2 px-4 py-2 rounded hover:bg-blue-100 text-gray-700 font-medium"
  onClick={() => setDrawerOpen(false)}
>
  <FaTasks /> WORK SHEET
</Link>



<Link
  to="/dashboard/my-payments"
  className="flex items-center gap-2 px-4 py-2 rounded hover:bg-blue-100 text-gray-700 font-medium"
  onClick={() => setDrawerOpen(false)}
>
  <FaMoneyBillWave /> MY PAYMENTS HISTORY
</Link>
  </>
}

{
!roleLoading && role === "HR" && (
  <>
    <Link
      to="/dashboard/employee"
      className="flex items-center gap-2 px-4 py-2 rounded hover:bg-blue-100 text-gray-700 font-medium"
      onClick={() => setDrawerOpen(false)}
    >
      <FaUsers /> ALL EMPLOYEE
    </Link>

    <Link
      to="/dashboard/progress"
      className="flex items-center gap-2 px-4 py-2 rounded hover:bg-blue-100 text-gray-700 font-medium"
      onClick={() => setDrawerOpen(false)}
    >
      <FaRegChartBar /> PROGRESS
    </Link>
  </>
)}

{
!roleLoading && role === "Admin" && (
  <>
    <Link
      to="/dashboard/payment"
      className="flex items-center gap-2 px-4 py-2 rounded hover:bg-blue-100 text-gray-700 font-medium"
      onClick={() => setDrawerOpen(false)}
    >
      <FaClipboardCheck /> PAYMENTS PENDING
    </Link>

    <Link
      to="/dashboard/verified-hrs"
      className="flex items-center gap-2 px-4 py-2 rounded hover:bg-blue-100 text-gray-700 font-medium"
      onClick={() => setDrawerOpen(false)}
    >
      <FaUsers /> HR & EMPLOYEE
    </Link>

    <Link
      to="/dashboard/AdminManager"
      className="flex items-center gap-2 px-4 py-2 rounded hover:bg-blue-100 text-gray-700 font-medium"
      onClick={() => setDrawerOpen(false)}
    >
      <FaUserShield /> ADMIN MANAGER
    </Link>

    <Link
      to="/dashboard/salary"
      className="flex items-center gap-2 px-4 py-2 rounded hover:bg-blue-100 text-gray-700 font-medium"
      onClick={() => setDrawerOpen(false)}
    >
      <FaCoins /> SALARY INFO
    </Link>
  </>
)}

       
       
        </nav>
      </div>

      
      


      {/* Overlay for Mobile */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-6 overflow-y-auto bg-gray-50 min-h-screen md:ml-16">
        <div className="max-w-5xl mx-auto w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
