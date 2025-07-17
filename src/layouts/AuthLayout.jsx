import React from "react";
import { Outlet, Link } from "react-router";
import authImg from "../assets/undraw_mobile-payments_0u42.png";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-100 flex flex-col items-center justify-center px-4 py-8">
      {/* Logo */}
      <Link
        to="/"
        className="text-3xl font-bold text-blue-600 mb-8 flex items-center gap-2"
      >
        📋 <span>ManageEm</span>
      </Link>

      {/* Main Card */}
      <div className="w-full max-w-6xl bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col-reverse md:flex-row items-center">
        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8 sm:p-10">
          <Outlet />
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2  flex justify-center items-center p-10">
          <img
            src={authImg}
            alt="Auth Visual"
            className="w-full max-w-[320px] md:max-w-[300px] lg:max-w-[350px]"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
