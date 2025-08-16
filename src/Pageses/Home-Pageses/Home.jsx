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
import KeyMetricsSection from './KeyMetricsSection';
import WorkflowSection from './WorkflowSection';
import CallToActionSection from './CallToActionSection';

const Home = () => {
    return (
        <div>
           
            <HeroSection></HeroSection>
            {/* <ImageSlider></ImageSlider> */}
            <ServicesSection></ServicesSection>
            <TestimonialsSection></TestimonialsSection>
            <FeatureHighlights></FeatureHighlights>
            {/* <StatsSection></StatsSection> */}
            <KeyMetricsSection></KeyMetricsSection>
            <WorkflowSection></WorkflowSection>
            <CallToActionSection></CallToActionSection>
            
       
        </div>
    );
};

export default Home;