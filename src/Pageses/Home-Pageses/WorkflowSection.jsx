import React from "react";
import { UserPlus, FileText, BarChart2 } from "lucide-react";

const WorkflowSection = () => {
  const steps = [
    { icon: <UserPlus className="w-12 h-12 text-blue-600 mx-auto" />, title: "Sign Up & Profile Setup", desc: "Employees and HR register and complete their profiles quickly." },
    { icon: <FileText className="w-12 h-12 text-blue-600 mx-auto" />, title: "Manage Tasks & Teams", desc: "HR and Admin assign tasks, track performance, and manage teams efficiently." },
    { icon: <BarChart2 className="w-12 h-12 text-blue-600 mx-auto" />, title: "Insights & Growth", desc: "Generate reports, analyze performance, and make informed decisions." },
  ];

  return (
    <section className="py-16 bg-white w-full mx-auto">
      <div className="w-full mx-auto px-8">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-12">How Our System Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="p-6 bg-blue-50 rounded-xl shadow text-center hover:shadow-lg transition">
              {step.icon}
              <h3 className="text-xl font-semibold mt-4 mb-2">{step.title}</h3>
              <p className="text-gray-700">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;
