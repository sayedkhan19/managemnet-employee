import React, { useState } from "react";
import { Link, Outlet } from "react-router";
import { Menu } from "lucide-react";

const DashboardLayout = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex h-screen">
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
            onClick={() => setDrawerOpen(false)} // close on mobile
          >
            Home
          </Link>
         
          <Link
            to="/dashboard/profile"
            className="px-4 py-2 rounded hover:bg-blue-100 text-gray-700 font-medium"
            onClick={() => setDrawerOpen(false)} // close on mobile
          >
            My Profile
          </Link>
         
         
          <Link
            to="/dashboard/workflow"
            className="px-4 py-2 rounded hover:bg-blue-100 text-gray-700 font-medium"
            onClick={() => setDrawerOpen(false)}
          >
            Workflow (Later)
          </Link>
         
          <Link
            to="/dashboard/salary"
            className="px-4 py-2 rounded hover:bg-blue-100 text-gray-700 font-medium"
            onClick={() => setDrawerOpen(false)}
          >
            Salary Info (Later)
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
      <div className="flex-1 overflow-y-auto p-4 md:ml-64">
        <Outlet />
      </div>
    </div>
  );
};


export default DashboardLayout;