import React from 'react';
import { Outlet } from 'react-router';
import NavBar from '../Pageses/SharedPage/NavBar';
import Footer from '../Pageses/SharedPage/Footer';

const RootLayouts = () => {
    return (
        <div className='max-w-[1500px] mx-auto bg-base-100 text-base-content'>
            
            <div className="navbar max-w-[1500px] mx-auto 
            bg-base-100 shadow-sm fixed top-0 left-0 right-0 z-50">
                <NavBar></NavBar>
            </div>
           
    
    <div className="pt-16 w-full">
         <Outlet></Outlet>
    </div>

<div className='w-full'>
    <Footer></Footer>
</div>

        </div>
    );
};

export default RootLayouts;