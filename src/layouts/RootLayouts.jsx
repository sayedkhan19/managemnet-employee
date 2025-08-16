import React from 'react';
import { Outlet } from 'react-router';
import NavBar from '../Pageses/SharedPage/NavBar';
import Footer from '../Pageses/SharedPage/Footer';

const RootLayouts = () => {
    return (
        <div className='px-5'>
            <div className="navbar w-full bg-base-100 shadow-sm fixed top-0 left-0 right-0 z-50">
                <NavBar></NavBar>
            </div>
           
    
    <div className="pt-16">
         <Outlet></Outlet>
    </div>

<div>
    <Footer></Footer>
</div>

        </div>
    );
};

export default RootLayouts;