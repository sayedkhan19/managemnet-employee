import React from "react";
import { Outlet } from "react-router";
import authImg from "../assets/undraw_mobile-payments_0u42.png";
import NavBar from "../Pageses/SharedPage/NavBar";

const AuthLayout = () => {
  return (
    <>
      <NavBar />

      <div className="min-h-[calc(100vh-64px)] bg-gradient-to-r from-blue-50 via-white to-blue-100 flex justify-center px-4 py-6">
        {/* Main Card */}
        <div className="w-full max-w-6xl bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col-reverse md:flex-row items-center">
          
          {/* Form Section */}
          <div className="w-full md:w-1/2 p-4 sm:p-6">
            <Outlet />
          </div>

          {/* Image Section */}
          <div className="w-full md:w-1/2 flex justify-center items-center p-5">
            <img
              src={authImg}
              alt="Auth Visual"
              className="w-full max-w-[320px] md:max-w-[300px] lg:max-w-[350px]"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
