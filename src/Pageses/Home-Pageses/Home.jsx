import React from 'react';
import NavBar from '../SharedPage/NavBar';
import { Outlet } from 'react-router';
import Footer from '../SharedPage/Footer';
import HeroSection from './HeroSection';
import ServicesSection from './ServicesSection';
import TestimonialsSection from './TestimonialsSection';
import StatsSection from './StatsSection';
import ImageSlider from './ImageSlider';
import FeatureHighlights from './FeatureHighlights';

const Home = () => {
    return (
        <div>
            <NavBar></NavBar>
           
            <HeroSection></HeroSection>
            {/* <ImageSlider></ImageSlider> */}
            <ServicesSection></ServicesSection>
            <TestimonialsSection></TestimonialsSection>
            <FeatureHighlights></FeatureHighlights>
            <StatsSection></StatsSection>
            
            <Footer></Footer>
       
        </div>
    );
};

export default Home;