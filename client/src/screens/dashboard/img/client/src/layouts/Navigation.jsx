import React from 'react'
import { NavLink } from 'react-router-dom'

import { IoIosHome } from "react-icons/io";
import { FaQuestion } from "react-icons/fa";
import { CiUnlock } from "react-icons/ci";
import { IoIosLogIn } from "react-icons/io";
import { BiCategoryAlt } from "react-icons/bi";
import { ImUser } from "react-icons/im";
import { VscMailRead } from "react-icons/vsc";

const Navigation = () => {
  return (
    <div className='text-white text-3xl font-bold top-0 sticky w-full flex gap-12 justify-center p-4 bg-teal-500'>

        <NavLink to="/" className="hover:text-teal-900">Home
        <IoIosHome className='inline mt-[-7px] ' />
        </NavLink>

        <NavLink to="/about" className="hover:text-teal-900">About Us
         <ImUser className='inline mt-[-7px] ' />
        </NavLink>

        <NavLink to="/faq" className="hover:text-teal-900">FAQ
        <FaQuestion className='inline mt-[-7px] ' />
        </NavLink>

        <NavLink to="/category" className="hover:text-teal-900">Category
        <BiCategoryAlt className='inline mt-[-7px] ' />
        </NavLink>
        <NavLink to="/login" className="hover:text-teal-900">Login
         <IoIosLogIn className='inline mt-[-7px] ' />
        </NavLink>
        <NavLink to="signup" className="hover:text-teal-900">Sign Up
          <CiUnlock className='inline mt-[-7px] ' />
        </NavLink>
        <NavLink to="contactus" className="hover:text-teal-900">Contact Us
           <VscMailRead className='inline mt-[-7px] ' />
        </NavLink>
       </div>
  )
}

export default Navigation
