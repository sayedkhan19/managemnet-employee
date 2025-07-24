import React, { useState } from "react";
import { Link, Outlet } from "react-router";
import { Menu } from "lucide-react";

const DashboardLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

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
            className="px-4 py-2 rounded hover:bg-blue-100 text-gray-700 font-medium"
            onClick={() => setDrawerOpen(false)}
          >
            Home
          </Link>

          <Link
            to="/dashboard/work"
            className="px-4 py-2 rounded hover:bg-blue-100 text-gray-700 font-medium"
            onClick={() => setDrawerOpen(false)}
          >
            Work Sheet
          </Link>

          <Link
            to="/dashboard/profile"
            className="px-4 py-2 rounded hover:bg-blue-100 text-gray-700 font-medium"
            onClick={() => setDrawerOpen(false)}
          >
            My Profile
          </Link>
          
          <Link
            to="/dashboard/my-payments"
            className="px-4 py-2 rounded hover:bg-blue-100 text-gray-700 font-medium"
            onClick={() => setDrawerOpen(false)}
          >
            My Payment History
          </Link>
               

               {/*salary  */}
          <Link
            to="/dashboard/salary"
            className="px-4 py-2 rounded hover:bg-blue-100 text-gray-700 font-medium"
            onClick={() => setDrawerOpen(false)}
          >
          admin  Salary Info
          </Link>

          {/* Hr all route */}
          <Link
            to="/dashboard/employee"
            className="px-4 py-2 rounded hover:bg-blue-100 text-gray-700 font-medium"
            onClick={() => setDrawerOpen(false)}
          >
          hr  All Employee
          </Link>
         
          <Link
            to="/dashboard/progress"
            className="px-4 py-2 rounded hover:bg-blue-100 text-gray-700 font-medium"
            onClick={() => setDrawerOpen(false)}
          >
          hr  progress
          </Link>
         
         
          {/* Hr all route */}
          <Link
            to="/dashboard/payment"
            className="px-4 py-2 rounded hover:bg-blue-100 text-gray-700 font-medium"
            onClick={() => setDrawerOpen(false)}
          >
          admin  Payments Status
          </Link>
          
          <Link
            to="/dashboard/verified-hrs"
            className="px-4 py-2 rounded hover:bg-blue-100 text-gray-700 font-medium"
            onClick={() => setDrawerOpen(false)}
          >
          admin All Hr & verifed em
          </Link>
       
          <Link
            to="/dashboard/AdminManager"
            className="px-4 py-2 rounded hover:bg-blue-100 text-gray-700 font-medium"
            onClick={() => setDrawerOpen(false)}
          >
          admin AdminManager
          </Link>
       
       
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
