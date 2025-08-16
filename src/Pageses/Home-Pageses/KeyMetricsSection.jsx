import React from "react";
import { Users, UserCheck, Smile, Clock } from "lucide-react";

const KeyMetricsSection = () => {
  const metrics = [
    { icon: <Users className="w-12 h-12 text-blue-600 mx-auto" />, value: "500+", label: "Employees Managed" },
    { icon: <UserCheck className="w-12 h-12 text-blue-600 mx-auto" />, value: "120+", label: "HR Professionals" },
    { icon: <Smile className="w-12 h-12 text-blue-600 mx-auto" />, value: "99%", label: "Satisfied Users" },
    { icon: <Clock className="w-12 h-12 text-blue-600 mx-auto" />, value: "24/7", label: "Support Available" },
  ];

  return (
    <section className="py-16 bg-blue-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-12">Our Impact in Numbers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {metrics.map((metric, idx) => (
            <div key={idx} className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
              {metric.icon}
              <p className="text-4xl font-extrabold text-blue-600 mt-2">{metric.value}</p>
              <p className="mt-2 text-gray-700">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyMetricsSection;
