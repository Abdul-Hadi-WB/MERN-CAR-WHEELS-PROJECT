import axios from 'axios';
import { useState } from 'react';
import { BsLockFill } from 'react-icons/bs';
import { ImUser } from 'react-icons/im';
import { Link } from 'react-router-dom';
import apis from '../../config/apis';
import { useAuth } from '../../context/auth';
import { errorToast, successToast } from '../../helpers/toastify';
import signup_picture from '../../img/user.jpg';

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [auth, setAuth] = useAuth();

  const LoginHandler = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(`${apis.auth}/login`, user);
    if (data?.error) {
      errorToast(data?.error);
    } else {
      successToast("you are successully logged in");
      localStorage.setItem('auth', JSON.stringify(data));
      setAuth(data); /// auth
      // setTimeout(() => {
      //   location.href = '/dashboard';
      // }, 2000);
    }
  };

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  return (
    <div className="min-h-screen bg-gray-700 flex justify-center items-center p-6">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-xl">
        {/* Heading */}
        <h1 className="text-4xl font-extrabold text-center text-red-600 mb-6">Login</h1>

        {/* Image */}
        <img
          src={signup_picture}
          alt="login visual"
          className="mx-auto mb-6 rounded-xl w-44 h-44 shadow-md"
        />

        {/* Form */}
        <form onSubmit={LoginHandler} className="space-y-5 px-2">
          <div className="flex items-center border rounded-lg p-3 bg-gray-50 focus-within:bg-white transition">
            <ImUser className="w-6 h-6 text-red-500" />
            <input
              value={user.email}
              name="email"
              onChange={changeHandler}
              placeholder="Enter your email"
              className="bg-transparent ml-3 text-lg flex-1 outline-none text-gray-700"
            />
          </div>

          <div className="flex items-center border rounded-lg p-3 bg-gray-50 focus-within:bg-white transition">
            <BsLockFill className="w-6 h-6 text-red-500" />
            <input
              value={user.password}
              name="password"
              type="password"
              onChange={changeHandler}
              placeholder="Enter your password"
              className="bg-transparent ml-3 text-lg flex-1 outline-none text-gray-700"
            />
          </div>

          {/* Remember + Forgot */}
          <div className="flex justify-between text-sm text-gray-600 px-1">
            <label className="flex items-center">
              <input type="checkbox" className="w-4 h-4 text-red-600" />
              <span className="ml-2">Remember Me</span>
            </label>
            <button type="button" className="text-red-500 hover:underline">
              Forgot Password?
            </button>
          </div>

          {/* Submit */}
          <button className="w-full bg-red-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition">
            Login
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-red-600 font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
