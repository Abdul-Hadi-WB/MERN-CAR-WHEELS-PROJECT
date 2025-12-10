import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import Wheels_Zone from "../css/img/Hadis-Wheels-Zone.png";

const Navigation = () => {
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" }, 
    { name: "Cars", path: "/cars" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Login", path: "/login", special: true },
  ];

  return (
    // FONT CHANGE: Replaced font-mono with font-serif for a luxurious feel
    <nav className="bg-white shadow-xl sticky top-0 z-50 font-serif">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 py-3">
        {/* Logo */}
        <NavLink to="/" className="flex items-center">
          <img
            src={Wheels_Zone}
            alt="Hadi"
            className="h-10 sm:h-12 w-auto object-contain cursor-pointer"
          />
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) =>
            item.special ? (
              // Login Button
              <NavLink
                key={index}
                to={item.path}
                className="text-white bg-red-700 px-3 py-1 text-lg font-bold tracking-wide border-2 border-red-700 shadow-md hover:bg-white hover:text-red-700 transition duration-300 ease-in-out rounded"
              >
                {item.name}
              </NavLink>
            ) : (
              // Regular Links
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  `px-1 py-1 text-lg font-medium text-gray-700 relative 
                  whitespace-nowrap 
                  
                  // Underline container
                  after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-red-700 after:scale-x-0 after:origin-bottom-right after:transition after:duration-300 after:ease-out
                  
                  // Active state: Underline is fully visible and text is red
                  ${
                    isActive
                      ? "text-red-700 after:scale-x-100 after:origin-bottom-left"
                      : "hover:text-red-700 hover:after:scale-x-100 hover:after:origin-bottom-left"
                  }
                  `
                }
              >
                {item.name}
              </NavLink>
            )
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl text-red-700 focus:outline-none"
          onClick={() => setOpen(!open)}
        >
          {open ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {open && (
        <div className="md:hidden bg-white shadow-lg flex flex-col items-center space-y-3 py-4 border-t border-gray-100 animate-fadeIn">
          {navItems.map((item, index) =>
            item.special ? (
              // Login Mobile Button
              <NavLink
                key={index}
                to={item.path}
                onClick={() => setOpen(false)}
                className="w-11/12 text-center text-white bg-red-700 px-6 py-2 text-lg font-bold tracking-wide border-2 border-red-700 shadow-md hover:bg-white hover:text-red-700 transition duration-300 ease-in-out rounded"
              >
                {item.name}
              </NavLink>
            ) : (
              // Regular Links
              <NavLink
                key={index}
                to={item.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `w-11/12 text-center px-4 py-2 text-lg font-medium transition duration-300 ease-in-out border-l-4 border-transparent
                  ${
                    isActive
                      ? "text-red-700 border-red-700 bg-red-50/50" // Active state with left border
                      : "text-gray-700 hover:text-red-700 hover:border-red-500"
                  }
                  `
                }
              >
                {item.name}
              </NavLink>
            )
          )}
        </div>
      )}
    </nav>
  );
};

export default Navigation;