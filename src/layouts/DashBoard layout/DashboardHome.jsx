import React from 'react';
import useUserRole from '../../hooks/useUserRole';

const DashboardHome = () => {
  const { role, roleLoading } = useUserRole();

  if (roleLoading) {
    return <div className="text-center text-lg font-semibold mt-10">Loading dashboard...</div>;
  }

  if (role === "Employee") {
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl font-bold mb-2">Welcome, Employee!</h2>
        <p className="text-gray-600">Track your tasks, view payments, and manage your worksheet easily from here.</p>
      </div>
    );
  }

  if (role === "Admin") {
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl font-bold mb-2">Welcome, Admin!</h2>
        <p className="text-gray-600">Manage users, oversee system activity, and control platform settings.</p>
      </div>
    );
  }

  if (role === "HR") {
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl font-bold mb-2">Welcome, HR Executive!</h2>
        <p className="text-gray-600">Review salary requests, monitor employee workflows, and handle contracts with ease.</p>
      </div>
    );
  }

  return <div className="text-center text-red-600 mt-10">Role not recognized.</div>;
};

export default DashboardHome;
