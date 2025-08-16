import React from 'react';

const services = [
  {
    title: "Employee Task Tracking",
    description: "Monitor employee workload and productivity in real-time.",
  },
  {
    title: "Payroll Automation",
    description: "Automate monthly salary payments with approval workflows.",
  },
  {
    title: "HR Dashboard",
    description: "Verify employees, manage roles and monitor work progress.",
  },
];

const ServicesSection = () => {
  return (
    <div className="w-full py-16 bg-white">
      <h2 className="text-3xl font-bold text-center mb-10 text-blue-800">Our Services</h2>
      <div className="grid gap-8 md:grid-cols-3">
        {services.map((service, idx) => (
          <div
            key={idx}
            className="p-6 border rounded-lg shadow hover:shadow-lg transition bg-gray-50"
          >
            <h3 className="text-xl font-semibold text-blue-600 mb-2">{service.title}</h3>
            <p className="text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;
