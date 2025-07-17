import React from 'react';
import NavBar from '../SharedPage/NavBar';
import { Outlet } from 'react-router';
import Footer from '../SharedPage/Footer';

const Home = () => {
    return (
        <div>
            <NavBar></NavBar>
           
            <Outlet></Outlet>
            
            <Footer></Footer>
       
        </div>
    );
};

export default Home;