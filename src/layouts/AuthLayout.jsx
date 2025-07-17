import React from 'react';
import { Link, Outlet } from 'react-router';
import authImg from '../assets/undraw_mobile-payments_0u42.png';

const AuthLayout = () => {
    return (
        <div className="p-12 bg-base-200 ">
            <Link  to={"/"} className="text-2xl font-bold mb-2">📋 ManageEm</Link>
  <div className="hero-content flex-col lg:flex-row-reverse">
  
   <div className='flex-1'>
     <img
      src={authImg}
      className="max-w-sm rounded-lg shadow"
    />
   </div>
    
    <div className='flex-1'>
      
     <Outlet></Outlet>
    </div>
  </div>
</div>
    );
};

export default AuthLayout;