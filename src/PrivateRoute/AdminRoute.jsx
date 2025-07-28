import React, { Children } from 'react';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';
import { Navigate } from 'react-router';

const AdminRoute = ({children}) => {
    const { user, loading } = useAuth();
    const { role, roleLoading } = useUserRole();

  if (loading || roleLoading || !role) {
    // Wait until everything is fully loaded
    return <span className="loading loading-bars loading-xl"></span>;
  }

  if (!user || role !== "Admin") {
    return <Navigate state={{ from: location.pathname }} to={"/forbidden"} />;
  }

  return children;
};

export default AdminRoute;