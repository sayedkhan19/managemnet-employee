import React from "react";
import { useNavigate } from "react-router";

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-white to-blue-50 flex items-center justify-center px-4">
      <div className="text-center max-w-xl">
        <h1 className="text-7xl font-bold text-blue-600 mb-4">404</h1>
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-6 text-sm sm:text-base">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={handleHomeClick}
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
