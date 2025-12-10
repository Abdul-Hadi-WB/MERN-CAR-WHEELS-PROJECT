import React, { useState } from 'react';
import axios from 'axios';
import { ImUser } from "react-icons/im";
import { BsLockFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import apis from '../../config/apis';
import { useAuth } from '../../context/auth';
import { errorToast, successToast } from '../../helpers/toastify';
import signup_picture from '../../css/img/User.png';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  
  const [loading, setLoading] = useState(false);
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      errorToast("All fields Required");
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      errorToast("Psswords dont match");
      return;
    }
    
    if (formData.password.length < 6) {
      errorToast("Password length should be above 6");
      return;
    }
    
    setLoading(true);
    
    try {
      // ✅ CHANGE: Use /pre-signup endpoint instead of /signup
      const { data } = await axios.post(`${apis.auth}/pre-signup`, {
        email: formData.email,
        password: formData.password
      });
      
      console.log("Signup Response:", data);
      
      if (data.error) {
        errorToast(data.error);
      } else if (data.success) {
        successToast(data.message || "Signup successful!");
        
        // Auto-login: Save to localStorage and context
        localStorage.setItem("auth", JSON.stringify(data));
        setAuth(data);
        
        // Redirect based on role
        if (data.user?.role === "owner") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      console.error("Signup Error:", err);
      const errorMsg = err.response?.data?.error || 
                      err.message || 
                      "Signup failed. Try again.";
      errorToast(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl w-full max-w-sm">
        
        <h1 className="text-2xl md:text-3xl font-bold text-center text-red-600 mb-4">
          Signup
        </h1>

        <img
          src={signup_picture}
          alt="signup"
          className="mx-auto mb-4 w-32 h-32 md:w-36 md:h-36 rounded-full shadow-md border"
        />

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="flex items-center border rounded-lg p-2 bg-gray-50">
              <MdEmail className="w-5 h-5 text-red-500 mr-2" />
              <input
                value={formData.email}
                name="email"
                type="email"
                onChange={handleChange}
                placeholder="your@email.com"
                className="flex-1 outline-none bg-transparent"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="flex items-center border rounded-lg p-2 bg-gray-50">
              <BsLockFill className="w-5 h-5 text-red-500 mr-2" />
              <input
                value={formData.password}
                name="password"
                type="password"
                onChange={handleChange}
                placeholder="Enter password"
                className="flex-1 outline-none bg-transparent"
                required
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="flex items-center border rounded-lg p-2 bg-gray-50">
              <BsLockFill className="w-5 h-5 text-red-500 mr-2" />
              <input
                value={formData.confirmPassword}
                name="confirmPassword"
                type="password"
                onChange={handleChange}
                placeholder="Confirm password"
                className="flex-1 outline-none bg-transparent"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition disabled:bg-red-400"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </span>
            ) : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-red-600 font-semibold hover:underline">
              Login
            </Link>
          </p>
          <p className="text-xs text-gray-500 mt-2">
            ✅ Direct signup - No email verification
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;