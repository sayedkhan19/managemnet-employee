import React from 'react';
import { Link } from 'react-router';
import { FaUserTie, FaChartLine, FaUsersCog, FaCloud, FaShieldAlt, FaBolt } from 'react-icons/fa';
import { div } from 'framer-motion/client';
import NavBar from '../SharedPage/NavBar';
import Footer from '../SharedPage/Footer';

const AboutUs = () => {
  return (
    
   <div>
     <div className="bg-base-100 py-16 px-4 sm:px-8 md:px-16 lg:px-24 text-base-content">
      <div className="max-w-6xl mx-auto text-center">
        <Link to={"/"} className="text-4xl font-bold mb-4 text-blue-600">About ManageEM</Link>
        <p className="text-lg max-w-3xl mx-auto mb-10">
          <span className="font-semibold">ManageEM</span> is your all-in-one platform for smart, efficient, and secure employee management. Whether you're running a startup or managing a large enterprise, we simplify your HR workflows — from onboarding to performance.
        </p>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-6 mb-16 text-left">
          <div className="bg-base-200 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
            <h3 className="text-xl font-bold text-blue-600 mb-2">🚀 Our Vision</h3>
            <p>
              To revolutionize employee and team management through smart technology and intuitive design — empowering businesses to grow, scale, and lead.
            </p>
          </div>
          <div className="bg-base-200 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
            <h3 className="text-xl font-bold text-blue-600 mb-2">🎯 Our Mission</h3>
            <p>
              Build a platform that allows seamless control over employee data, roles, and performance with maximum transparency and minimal effort.
            </p>
          </div>
        </div>

        {/* Features Section */}
        <h3 className="text-3xl font-semibold mb-8 text-blue-600">Key Features</h3>
        <div className="grid gap-8 md:grid-cols-3 text-left">
          <FeatureCard icon={<FaUserTie />} title="Employee Profiles" text="Manage all employee details in one place with ease and security." />
          <FeatureCard icon={<FaChartLine />} title="Performance Tracking" text="Track employee KPIs, review activity, and measure progress in real-time." />
          <FeatureCard icon={<FaUsersCog />} title="Role Management" text="Assign roles such as Admin, Rider, or Employee with full control." />
          <FeatureCard icon={<FaCloud />} title="Cloud-Based" text="Access and manage your team from anywhere with our secure cloud platform." />
          <FeatureCard icon={<FaShieldAlt />} title="Secure & Private" text="We prioritize your data with top-grade encryption and security practices." />
          <FeatureCard icon={<FaBolt />} title="Fast & Responsive" text="Lightning-fast user interface optimized for all devices and screen sizes." />
        </div>

        {/* CTA */}
        <div className="mt-16">
          <h4 className="text-2xl font-bold mb-4">Join hundreds of teams using ManageEM to streamline operations.</h4>
          <Link to="/" className="btn btn-primary btn-lg text-white">
            Get Started Now
          </Link>
        </div>
      </div>
    </div>
   </div>
  );
};

const FeatureCard = ({ icon, title, text }) => (
  <div className="p-6 rounded-xl bg-base-200 shadow-md hover:shadow-lg transition-all duration-300">
    <div className="text-4xl text-primary mb-4">{icon}</div>
    <h4 className="text-xl font-semibold mb-2">{title}</h4>
    <p>{text}</p>
  </div>
);

export default AboutUs;
