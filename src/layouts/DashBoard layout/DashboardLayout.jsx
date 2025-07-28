import React, { useState } from "react";
import { NavLink, Outlet } from "react-router";
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
  FaEnvelope,
  } from "react-icons/fa";

const DashboardLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { role, roleLoading } = useUserRole();

  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded font-medium ${
      isActive ? "bg-blue-200 text-blue-900 font-semibold" : "hover:bg-blue-100 text-gray-700"
    }`;

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
          <NavLink to="/" className={linkClass} onClick={() => setDrawerOpen(false)}>
            <FaHome /> HOME
          </NavLink>

          <NavLink to="/dashboard/profile" className={linkClass} onClick={() => setDrawerOpen(false)}>
            <FaUserCircle /> MY PROFILE
          </NavLink>

          {!roleLoading && role === "Employee" && (
            <>
              <NavLink to="/dashboard/work" className={linkClass} onClick={() => setDrawerOpen(false)}>
                <FaTasks /> WORK SHEET
              </NavLink>

              <NavLink to="/dashboard/my-payments" className={linkClass} onClick={() => setDrawerOpen(false)}>
                <FaMoneyBillWave /> MY PAYMENTS HISTORY
              </NavLink>
            </>
          )}

          {!roleLoading && role === "HR" && (
            <>
              <NavLink to="/dashboard/employee" className={linkClass} onClick={() => setDrawerOpen(false)}>
                <FaUsers /> ALL EMPLOYEE
              </NavLink>

              <NavLink to="/dashboard/progress" className={linkClass} onClick={() => setDrawerOpen(false)}>
                <FaRegChartBar /> PROGRESS
              </NavLink>
            </>
          )}

          {!roleLoading && role === "Admin" && (
            <>
              <NavLink to="/dashboard/payment" className={linkClass} onClick={() => setDrawerOpen(false)}>
                <FaClipboardCheck /> PAYMENTS PENDING
              </NavLink>

              <NavLink to="/dashboard/verified-hrs" className={linkClass} onClick={() => setDrawerOpen(false)}>
                <FaUsers /> HR & EMPLOYEE
              </NavLink>

              <NavLink to="/dashboard/AdminManager" className={linkClass} onClick={() => setDrawerOpen(false)}>
                <FaUserShield /> ADMIN MANAGER
              </NavLink>

              <NavLink to="/dashboard/salary" className={linkClass} onClick={() => setDrawerOpen(false)}>
                <FaCoins /> SALARY INFO
              </NavLink>
             
              <NavLink to="/dashboard/message" className={linkClass} onClick={() => setDrawerOpen(false)}>
                <FaEnvelope className="inline-block mr-2" /> All Message
              </NavLink>
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
