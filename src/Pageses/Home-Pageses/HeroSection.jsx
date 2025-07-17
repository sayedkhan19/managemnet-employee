import React from 'react';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router';

const HeroSection = () => {
  const { user } = useAuth();

  return (
    <div className="bg-gradient-to-r from-blue-100 to-white py-16 sm:py-20 px-4 sm:px-6 text-center">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 max-w-3xl mx-auto leading-tight">
        Empowering Your Workforce with Smart Management
      </h1>
      <p className="text-base sm:text-lg mt-4 text-gray-600 max-w-xl mx-auto">
        Track employee tasks, performance, and payroll with ease. Your company’s growth starts here.
      </p>

      {/* Show Get Started button only if user is not logged in */}
      {!user && (
        <Link to="/login">
          <button className="mt-6 px-6 py-3 bg-blue-600 text-white text-sm sm:text-base font-medium rounded hover:bg-blue-700 transition">
            Get Started
          </button>
        </Link>
      )}
    </div>
  );
};

export default HeroSection;
