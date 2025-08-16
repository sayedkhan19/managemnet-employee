import React from "react";
import { CheckCircle, Shield, Cpu } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: <CheckCircle className="w-10 h-10 text-blue-600" />,
      title: "Efficient Task Management",
      desc: "Organize, assign, and track tasks seamlessly for all employees."
    },
    {
      icon: <Shield className="w-10 h-10 text-blue-600" />,
      title: "Secure & Reliable",
      desc: "Your data is protected with top-notch security and privacy measures."
    },
    {
      icon: <Cpu className="w-10 h-10 text-blue-600" />,
      title: "Smart Analytics",
      desc: "Gain insights into employee performance and HR operations easily."
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-800 mb-12">
          Why Choose Our System?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center text-center"
            >
              {feature.icon}
              <h3 className="text-xl font-semibold mt-4 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
