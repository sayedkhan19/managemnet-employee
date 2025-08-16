import React from "react";
import { ArrowRight } from "lucide-react";
import { NavLink } from "react-router";
import useAuth from "../../hooks/useAuth";

const CallToActionSection = () => {
    const { user } = useAuth();
  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Manage Your Team Efficiently?</h2>
        <p className="mb-8 text-lg md:text-xl text-blue-100">Join thousands of employees, HR professionals, and admins who trust our system every day.</p>
        
        {!user && (
        <NavLink
          to={"/login"}
          className="inline-flex items-center px-8 py-4 bg-white text-blue-700 font-semibold rounded-lg shadow hover:bg-gray-100 transition"
        >
          Get Started <ArrowRight className="w-5 h-5 ml-2" />
        </NavLink>
        )}
     
      </div>
    </section>
  );
};

export default CallToActionSection;
