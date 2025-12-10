import axios from "axios";
import { useState } from "react";
import { BsLockFill } from "react-icons/bs";
import { ImUser } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import apis from "../../config/apis";
import { useAuth } from "../../context/auth";
import { errorToast, successToast } from "../../helpers/toastify";
import signup_picture from "../../css/img/User.png";

const Login = () => {
  const [credentials, setCredentials] = useState({ 
    email: "", 
    password: "" 
  });
  
  const [loading, setLoading] = useState(false);
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!credentials.email || !credentials.password) {
      errorToast("Email aur password bharein");
      return;
    }
    
    setLoading(true);
    
    try {
      console.log("🚀 Sending login request...");
      
      const response = await axios.post(`${apis.auth}/login`, credentials);
      const data = response.data;
      
      console.log("✅ Login Response:", data);
      
      if (data.error) {
        errorToast(data.error);
      } else if (data.success) {
        successToast(data.message || "Login successful!");
        
        // Prepare auth data
        const authData = {
          user: data.user,
          token: data.token,
          refreshToken: data.refreshToken || ''
        };
        
        console.log("💾 Saving to localStorage:", authData);
        
        // Save to localStorage
        localStorage.setItem("auth", JSON.stringify(authData));
        
        // ✅ IMPORTANT: Update auth context
        setAuth(authData);
        
        // ✅ FIX 1: Use window.location.href for immediate redirect
        window.location.href = "/dashboard";
        
        // ✅ FIX 2: OR Use navigate with replace: true
        // navigate("/dashboard", { replace: true });
        
        // ✅ FIX 3: OR Use timeout with force reload
        // setTimeout(() => {
        //   navigate("/dashboard");
        //   window.location.reload(); // Force reload to update auth context
        // }, 100);
        
      } else {
        errorToast("Login failed. Please try again.");
      }
    } catch (err) {
      console.error("❌ Login Error:", err);
      const errorMsg = err.response?.data?.error || 
                      err.response?.data?.message || 
                      err.message || 
                      "Login failed. Check credentials.";
      errorToast(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Test login for development
  const testLogin = () => {
    setCredentials({
      email: "test@test.com",
      password: "test123"
    });
    setTimeout(() => {
      handleLogin(new Event('submit'));
    }, 100);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl w-full max-w-sm">
        
        <h1 className="text-2xl md:text-3xl font-bold text-center text-red-600 mb-4">
          Login
        </h1>

        <img
          src={signup_picture}
          alt="login"
          className="mx-auto mb-4 w-32 h-32 md:w-36 md:h-36 rounded-full shadow-md border"
        />

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="flex items-center border rounded-lg p-2 bg-gray-50">
              <ImUser className="w-5 h-5 text-red-500 mr-2" />
              <input
                value={credentials.email}
                name="email"
                type="email"
                onChange={handleChange}
                placeholder="Enter Email"
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
                value={credentials.password}
                name="password"
                type="password"
                onChange={handleChange}
                placeholder="Enter Password"
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
                Logging in...
              </span>
            ) : "Login"}
          </button>
        </form>

        {/* Test Button */}
        <button
          onClick={testLogin}
          className="w-full mt-3 bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300 transition text-sm"
        >
          Use Test Credentials (test@test.com / test123)
        </button>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-red-600 font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;