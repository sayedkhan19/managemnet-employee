import React from 'react';

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-r from-blue-100 to-white py-20 px-6 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
        Empowering Your Workforce with Smart Management
      </h1>
      <p className="text-lg mt-4 text-gray-600 max-w-xl mx-auto">
        Track employee tasks, performance, and payroll with ease. Your company’s growth starts here.
      </p>
      <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
        Get Started
      </button>
    </div>
  );
};

export default HeroSection;
