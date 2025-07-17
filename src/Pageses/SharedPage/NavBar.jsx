import React from 'react';
import { NavLink, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';

const NavBar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await logOut();
      navigate('/auth/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const NavItems = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/about">About Us</NavLink></li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
      {/* Start - Logo and Mobile Menu */}
      <div className="navbar-start">
        <div className="dropdown">
          <button tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </button>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {NavItems}
          </ul>
        </div>
        <NavLink to="/" className="btn btn-ghost text-xl hidden lg:block">ManageEM</NavLink>
      </div>

      {/* Center - Main Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{NavItems}</ul>
      </div>

      {/* End - User Info and Auth Buttons */}
      <div className="navbar-end space-x-2">
        {user && (
          <img
            className="rounded-full w-10 h-10 object-cover cursor-pointer"
            src={user.photoURL || "https://i.ibb.co/2kRTPqR/default-user.png"}
            alt="user profile"
            title={user.displayName || "User"}
            onError={(e) =>
              (e.currentTarget.src = "https://i.ibb.co/2kRTPqR/default-user.png")
            }
          />
        )}
        {user ? (
          <NavLink
            to="/auth/login"
            onClick={handleLogOut}
            className="btn btn-primary"
          >
            Log out
          </NavLink>
        ) : (
          <NavLink to="/auth/login" className="btn btn-primary">
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default NavBar;
