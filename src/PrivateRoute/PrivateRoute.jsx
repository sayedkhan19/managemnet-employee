import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation, } from 'react-router';

const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const {user, loading} = useAuth();
    

    if(loading){
        return <span className="loading loading-spinner text-primary"></span>
    }

    if(!user){
        <Navigate state={{from: location.pathname}} to={"/login"}></Navigate>
    }


    return children;
};

export default PrivateRoute;