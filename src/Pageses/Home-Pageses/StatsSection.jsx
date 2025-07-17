import React from 'react';

const StatsSection = () => {
  return (
    <div className="bg-white py-20 px-6 text-center">
      <h2 className="text-3xl font-bold mb-10">Company At A Glance</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
        <div>
          <p className="text-4xl font-bold text-blue-600">120+</p>
          <p className="text-gray-600">Employees</p>
        </div>
        <div>
          <p className="text-4xl font-bold text-blue-600">10+</p>
          <p className="text-gray-600">HR Managers</p>
        </div>
        <div>
          <p className="text-4xl font-bold text-blue-600">5</p>
          <p className="text-gray-600">Countries</p>
        </div>
        <div>
          <p className="text-4xl font-bold text-blue-600">99%</p>
          <p className="text-gray-600">Satisfaction</p>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
