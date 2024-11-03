// src/assets/component/Navbar.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineHome, HiOutlinePlusCircle, HiOutlineTag, HiOutlineUsers, HiOutlineClipboardList, HiOutlineShoppingCart } from "react-icons/hi";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r w-screen from-purple-600 to-indigo-600 shadow-lg">
      <div className="container  flex justify-between items-center md:p-6 p-2">
        <h1 className="text-white  text-lg md:text-2xl font-bold">Gozelia</h1>
        <ul className="flex space-x-4 md:space-x-8">
          <li>
            <Link to="/" className="flex items-center text-gray-100 hover:text-white transition duration-300 p-2 rounded-md">
              <HiOutlineHome className="mr-1 text-2xl md:text-3xl" /> 
              <span className="hidden md:inline text-sm md:text-base">Admin Panel</span>
            </Link>
          </li>
          <li>
            <Link to="/add" className="flex items-center text-gray-100 hover:text-white transition duration-300 p-2 rounded-md">
              <HiOutlinePlusCircle className="mr-1 text-2xl md:text-3xl" /> 
              <span className="hidden md:inline text-sm md:text-base">Add Product</span>
            </Link>
          </li>
          <li>
            <Link to="/coupon" className="flex items-center text-gray-100 hover:text-white transition duration-300 p-2 rounded-md">
              <HiOutlineTag className="mr-1 text-2xl md:text-3xl" /> 
              <span className="hidden md:inline text-sm md:text-base">Manage Coupons</span>
            </Link>
          </li>
          <li>
            <Link to="/users" className="flex items-center text-gray-100 hover:text-white transition duration-300 p-2 rounded-md">
              <HiOutlineUsers className="mr-1 text-2xl md:text-3xl" /> 
              <span className="hidden md:inline text-sm md:text-base">User Management</span>
            </Link>
          </li>
          <li>
            <Link to="/orders" className="flex items-center text-gray-100 hover:text-white transition duration-300 p-2 rounded-md">
              <HiOutlineClipboardList className="mr-1 text-2xl md:text-3xl" /> 
              <span className="hidden md:inline text-sm md:text-base">Order Management</span>
            </Link>
          </li>
          <li>
            <Link to="/fulfilled-orders" className="flex items-center text-gray-100 hover:text-white transition duration-300 p-2 rounded-md">
              <HiOutlineClipboardList className="mr-1 text-2xl md:text-3xl" /> 
              <span className="hidden md:inline text-sm md:text-base">Fulfilled Orders</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
