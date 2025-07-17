import React from 'react';
import NavBar from '../SharedPage/NavBar';
import { Outlet } from 'react-router';
import Footer from '../SharedPage/Footer';
import HeroSection from './HeroSection';
import ServicesSection from './ServicesSection';

const Home = () => {
    return (
        <div>
            <NavBar></NavBar>
           
            <HeroSection></HeroSection>
            <ServicesSection></ServicesSection>
            
            <Footer></Footer>
       
        </div>
    );
};

export default Home;