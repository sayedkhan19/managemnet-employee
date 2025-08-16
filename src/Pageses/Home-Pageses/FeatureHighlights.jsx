import React from "react";
import { Briefcase, Users, ShieldCheck, Clock } from "lucide-react";

const features = [
  {
    icon: <Briefcase size={32} className="text-indigo-600" />,
    title: "HR Automation",
    description: "Automate tasks like onboarding, leave, attendance & payroll.",
  },
  {
    icon: <Users size={32} className="text-green-600" />,
    title: "Team Collaboration",
    description: "Connect teams and manage performance in one dashboard.",
  },
  {
    icon: <ShieldCheck size={32} className="text-blue-600" />,
    title: "Secure Access",
    description: "Role-based access control to protect sensitive data.",
  },
  {
    icon: <Clock size={32} className="text-orange-600" />,
    title: "24/7 Access",
    description: "Cloud-based system accessible anytime, anywhere.",
  },
];

const FeatureHighlights = () => {
  return (
    <section className="py-12 md:py-16 bg-gray-50 w-full mx-auto">
      <div className="w-full mx-auto px-2 sm:px-6 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-blue-800">
          Why Choose Our System?
        </h2>
        <p className="text-gray-600 mb-10 sm:mb-12 text-sm sm:text-base">
          Smart tools designed to manage your entire workforce efficiently.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mx-auto">
          {features.map((item, i) => (
            <div
              key={i}
              className="bg-white shadow-md rounded-xl p-4 sm:p-6 hover:shadow-lg transition"
            >
              <div className="mb-4 flex justify-center">{item.icon}</div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm sm:text-[15px] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlights;
