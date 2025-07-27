import React from 'react';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';
import { Navigate } from 'react-router';

const HRRoute = ({children}) => {
    const {user, loading} = useAuth();
    const {role, roleLoading} = useUserRole();

    if(loading || roleLoading){
        return <span className="loading loading-bars loading-xl"></span>
    };

    if(!user || role !== "HR"){
        return <Navigate state={{from: location.pathname}} to={"/forbidden"}></Navigate>
    }
   
    return children;
};

export default HRRoute;