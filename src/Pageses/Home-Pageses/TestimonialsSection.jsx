import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  { name: "Fatima Begum", feedback: "The dashboard is clean and makes HR tasks easier than ever!" },
  { name: "Md. Rahim", feedback: "I love how easily I can track my daily tasks and see payments." },
  { name: "Sarah Ali", feedback: "This system is a lifesaver for HR departments!" },
  { name: "Ayesha Khan", feedback: "Impressive design and functionality. Our team loves it!" },
  { name: "Tanvir Hasan", feedback: "Finally an HR platform that doesn't feel outdated." },
];

const TestimonialsSection = () => {
  return (
    <div className="bg-blue-50 py-16 sm:px-6 overflow-hidden max-w-[1500px] mx-auto px-8 rounded-2xl mx-8">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 text-blue-800">
        What Our Users Say
      </h2>
      <div className="relative w-full max-w-7xl mx-auto overflow-hidden">
        <motion.div
          className="flex space-x-4 sm:space-x-6"
          animate={{ x: ["0%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        >
          {[...testimonials, ...testimonials].map((t, idx) => (
            <div
              key={idx}
              className="w-[250px] sm:w-[280px] md:w-[300px] bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 text-center flex-shrink-0"
            >
              <p className="italic text-gray-700 mb-4">“{t.feedback}”</p>
              <h4 className="font-semibold text-blue-600">{t.name}</h4>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
