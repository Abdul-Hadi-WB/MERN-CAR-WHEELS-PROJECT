import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchAllProducts } from "../../redux/actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../context/auth";
import { handleDelete } from "./ManageCars";
import { 
  FaCar, FaHome, FaUsers, FaCog, FaCreditCard, FaCalendar, 
  FaBell, FaSearch, FaSignOutAlt, FaUser, FaDollarSign, 
  FaPlus, FaEdit, FaTrash, FaGasPump, FaTachometerAlt, 
  FaWrench, FaFileAlt, FaMoon, FaSun, FaBars, FaTimes,
  FaEye, FaEyeSlash
} from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward, IoIosArrowDown } from "react-icons/io";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productSlice);
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  
  const [time, setTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dashboardLoading, setDashboardLoading] = useState(true);
  const [carsOpen, setCarsOpen] = useState(false);
  
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      text: "New car added to inventory",
      time: "2 min ago",
      type: "success",
      read: false,
    },
    {
      id: 2,
      text: "Car sale completed",
      time: "15 min ago",
      type: "info",
      read: false,
    },
    {
      id: 3,
      text: "Service appointment scheduled",
      time: "1 hour ago",
      type: "warning",
      read: true,
    },
    {
      id: 4,
      text: "New customer inquiry",
      time: "2 hours ago",
      type: "success",
      read: true,
    },
  ]);
  
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const notificationRef = useRef(null);

  // Fetch products and check auth
  useEffect(() => {
    const checkAuth = () => {
      const storedAuth = localStorage.getItem("auth");
      
      if (!storedAuth) {
        navigate("/login", { replace: true });
        return false;
      }

      try {
        const parsedAuth = JSON.parse(storedAuth);
        
        if (!auth?.user && parsedAuth?.user) {
          setAuth(parsedAuth);
        }

        if ((auth?.user && auth?.token) || (parsedAuth?.user && parsedAuth?.token)) {
          dispatch(fetchAllProducts());
          setDashboardLoading(false);
          return true;
        } else {
          navigate("/login", { replace: true });
          return false;
        }
      } catch (err) {
        console.error("Error parsing auth:", err);
        navigate("/login", { replace: true });
        return false;
      }
    };

    const timer = setTimeout(() => {
      checkAuth();
    }, 100);

    return () => clearTimeout(timer);
  }, [auth, dispatch, navigate, setAuth]);

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Handle logout - FIXED FUNCTION
  const handleLogout = () => {
    setAuth({
      user: null,
      token: '',
      refreshToken: '',
    });
    localStorage.removeItem("auth");
    navigate("/login", { replace: true });
  };

  // Handle notification functions
  const markNotificationAsRead = (id) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    setShowNotifications(false);
  };

  const unreadNotifications = notifications.filter((n) => !n.read).length;

  // Calculate revenue from products
  const parsePriceValue = (priceString) => {
    if (!priceString) return 0;
    const upperStr = String(priceString).toUpperCase();
    const numericPart = upperStr.replace(/[^0-9.]/g, '');
    let value = Number(numericPart);
    if (isNaN(value)) return 0;
    if (upperStr.includes('CR') || upperStr.includes('CRORE')) value *= 10000000;
    else if (upperStr.includes('LAKH') || upperStr.includes('LAC')) value *= 100000;
    return value;
  };

  const calculateTotalRevenue = () => {
    if (!products || products.length === 0) return "PKR 0";
    const total = products.reduce((sum, product) => sum + parsePriceValue(product.price), 0);
    const trillion = 1000000000000;
    const billion = 1000000000;
    if (total >= trillion) return `PKR ${(total / trillion).toFixed(2)} Trillion`;
    else if (total >= billion) return `PKR ${(total / billion).toFixed(2)} Billion`;
    else return `PKR ${total.toLocaleString()}`;
  };

  const totalRevenue = calculateTotalRevenue();

  // Pagination for cars table
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
  const nextPage = () => currentPage < totalPages && setCurrentPage(prev => prev + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(prev => prev - 1);
  let items = indexOfFirstItem + 1;

  // Format time and date
  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Show loading while checking auth
  if (dashboardLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600 mx-auto"></div>
          <p className="mt-6 text-gray-700 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Final check before rendering dashboard
  if (!auth?.user || !auth?.token) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-red-600 font-semibold">Authentication Error</p>
          <p className="text-gray-600 mt-2">Please login again</p>
          <button
            onClick={() => navigate("/login")}
            className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar for Mobile */}
      <aside className={`fixed left-0 top-0 h-screen w-64 bg-gray-900 text-white flex flex-col p-4 z-50 transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:hidden"}`}>
        <button className="absolute top-3 right-3 text-white text-xl lg:hidden" onClick={() => setSidebarOpen(false)}>
          <FaTimes />
        </button>
        
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-orange-500 rounded-lg flex items-center justify-center">
            <FaCar className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-semibold text-red-500 tracking-wide">CarNexus</h2>
        </div>
        
        {/* User Info */}
        <div className="mb-6 p-3 bg-gray-800 rounded-lg">
          <p className="text-sm text-gray-300">Logged in as:</p>
          <p className="font-medium text-white">{auth.user.email}</p>
          <p className="text-xs text-gray-400">Admin</p>
        </div>
        
        <nav className="flex flex-col gap-2 text-sm flex-1">
          <Link 
            to="/dashboard" 
            className="hover:bg-red-600 px-3 py-2.5 rounded-md transition flex items-center gap-2"
            onClick={() => setSidebarOpen(false)}
          >
            <FaHome className="text-red-400" /> Dashboard
          </Link>

          <div className="relative">
            <button 
              onClick={() => setCarsOpen(!carsOpen)} 
              className="w-full text-left hover:bg-red-600 px-3 py-2.5 rounded-md flex justify-between items-center transition"
            >
              <span className="flex items-center gap-2">
                <FaCar className="text-red-400" /> Cars
              </span>
              <IoIosArrowDown className={`text-white text-base transition-transform duration-300 ${carsOpen ? "rotate-180" : ""}`} />
            </button>
            {carsOpen && (
              <div className="ml-5 flex flex-col mt-1 text-sm gap-1.5"> 
                <Link 
                  to="/dashboard/addcars" 
                  className="hover:bg-red-500 px-3 py-2 rounded-md flex items-center gap-2"
                  onClick={() => setSidebarOpen(false)}
                >
                  <FaPlus className="text-sm" /> Add Car
                </Link>
                <Link 
                  to="/dashboard" 
                  className="hover:bg-red-500 px-3 py-2 rounded-md flex items-center gap-2"
                  onClick={() => setSidebarOpen(false)}
                >
                  <FaCar className="text-sm" /> Manage Cars
                </Link>
              </div>
            )}
          </div>

          <Link to="#" className="hover:bg-red-600 px-3 py-2.5 rounded-md transition flex items-center gap-2">
            <FaUsers className="text-red-400" /> Users
          </Link>
          <Link to="#" className="hover:bg-red-600 px-3 py-2.5 rounded-md transition flex items-center gap-2">
            <FaCog className="text-red-400" /> Settings
          </Link>
        </nav>

        {/* LOGOUT BUTTON in Mobile Sidebar - FIXED */}
        <button 
          onClick={handleLogout} 
          className="mt-4 flex justify-center items-center bg-red-500 hover:bg-red-600 py-2.5 rounded-md text-white font-medium text-sm gap-2"
        >
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 overflow-y-auto w-full">
        {/* Top Navigation Bar */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-2xl text-gray-700" onClick={() => setSidebarOpen(true)}>
              <FaBars />
            </button>
            
            {/* Desktop Logo */}
            <div className="hidden lg:flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-orange-500 rounded-lg flex items-center justify-center">
                <FaCar className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Car<span className="text-red-600">Nexus</span></h1>
            </div>
          </div>

          <h1 className="text-xl md:text-2xl font-bold text-gray-800">Dashboard Overview</h1>

          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="relative hidden md:block">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cars..."
                className="pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-transparent w-48"
              />
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 border border-gray-300 transition-all duration-300"
            >
              {darkMode ? (
                <FaSun className="w-5 h-5 text-gray-700" />
              ) : (
                <FaMoon className="w-5 h-5 text-gray-700" />
              )}
            </button>

            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-xl bg-gray-100 hover:bg-gray-200 border border-gray-300 transition-all duration-300"
              >
                <FaBell className="w-5 h-5 text-gray-700" />
                {unreadNotifications > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl border border-gray-200 shadow-xl z-50">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900">
                        Notifications
                      </h3>
                      <div className="flex items-center space-x-2">
                        {unreadNotifications > 0 && (
                          <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-600">
                            {unreadNotifications} new
                          </span>
                        )}
                        <button
                          onClick={clearAllNotifications}
                          className="text-sm text-red-500 hover:text-red-700 transition-colors"
                        >
                          Clear all
                        </button>
                      </div>
                    </div>
                    <div className="space-y-3 max-h-80 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-3 rounded-xl transition-all duration-300 cursor-pointer ${
                              notification.read
                                ? "bg-gray-100/50"
                                : "bg-red-50 border border-red-200"
                            }`}
                            onClick={() => markNotificationAsRead(notification.id)}
                          >
                            <div className="flex items-start space-x-3">
                              <div
                                className={`p-2 rounded-lg ${
                                  notification.type === "success"
                                    ? "bg-green-100"
                                    : notification.type === "warning"
                                    ? "bg-orange-100"
                                    : "bg-red-100"
                                }`}
                              >
                                {notification.type === "success" ? (
                                  <FaEye className="w-4 h-4 text-green-600" />
                                ) : notification.type === "warning" ? (
                                  <FaEyeSlash className="w-4 h-4 text-orange-600" />
                                ) : (
                                  <FaBell className="w-4 h-4 text-red-600" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm text-gray-900">
                                  {notification.text}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  {notification.time}
                                </p>
                              </div>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-6">
                          <FaBell className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                          <p className="text-gray-600">No notifications</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Info and Logout - FIXED */}
            <div className="flex items-center space-x-3">
              <div className="text-right hidden md:block">
                <h4 className="font-semibold text-sm text-gray-900">
                  {auth?.user?.name || "Admin"}
                </h4>
                <p className="text-xs text-gray-600">
                  {auth?.user?.email || "admin@carnexus.com"}
                </p>
              </div>
              
              <div className="relative group">
                <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-orange-500 rounded-full flex items-center justify-center cursor-pointer">
                  <FaUser className="w-5 h-5 text-white" />
                </div>
                
                {/* Logout Dropdown - FIXED and WORKING */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl border border-gray-200 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="p-3">
                    <div className="mb-3 p-2 rounded-lg bg-gray-50">
                      <p className="text-sm font-medium text-gray-900">Logged in as:</p>
                      <p className="text-xs text-gray-600 truncate">{auth?.user?.email}</p>
                    </div>
                    {/* STANDALONE LOGOUT BUTTON - FIXED */}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 border border-red-500 rounded-lg transition-all duration-300 text-white text-sm font-medium"
                    >
                      <FaSignOutAlt className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Desktop Logout Button - ALTERNATIVE VISIBLE BUTTON */}
              <button
                onClick={handleLogout}
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-all duration-300 text-white text-sm font-medium"
              >
                <FaSignOutAlt className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Time and Date */}
        <div className="mb-6">
          <p className="text-gray-600">
            {formatDate(time)} • {formatTime(time)}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-gray-500 text-sm">Total Cars</h2>
                <p className="text-2xl font-bold text-red-600 mt-2">{products.length}</p>
                <p className="text-xs text-gray-500 mt-1">Available in inventory</p>
              </div>
              <div className="p-3 bg-red-100 rounded-xl">
                <FaCar className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <span className="text-sm font-medium text-green-500">+8.2%</span>
              <span className="text-sm text-gray-500 ml-2">from last month</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-gray-500 text-sm">Monthly Revenue</h2>
                <p className="text-2xl font-bold text-red-600 mt-2">{totalRevenue}</p>
                <p className="text-xs text-gray-500 mt-1">This month sales</p>
              </div>
              <div className="p-3 bg-red-100 rounded-xl">
                <FaDollarSign className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <span className="text-sm font-medium text-green-500">+12.5%</span>
              <span className="text-sm text-gray-500 ml-2">from last month</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-gray-500 text-sm">Test Drives</h2>
                <p className="text-2xl font-bold text-red-600 mt-2">84</p>
                <p className="text-xs text-gray-500 mt-1">Scheduled this week</p>
              </div>
              <div className="p-3 bg-red-100 rounded-xl">
                <FaTachometerAlt className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <span className="text-sm font-medium text-green-500">+5.1%</span>
              <span className="text-sm text-gray-500 ml-2">from last month</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-gray-500 text-sm">Conversion Rate</h2>
                <p className="text-2xl font-bold text-red-600 mt-2">24.7%</p>
                <p className="text-xs text-gray-500 mt-1">Inquiry to sale</p>
              </div>
              <div className="p-3 bg-red-100 rounded-xl">
                <FaCar className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <span className="text-sm font-medium text-green-500">+2.3%</span>
              <span className="text-sm text-gray-500 ml-2">from last month</span>
            </div>
          </div>
        </div>

        {/* Cars Table */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Manage Cars</h2>
              <p className="text-sm text-gray-600 mt-1">
                All cars in inventory ({products.length} total)
              </p>
            </div>
            <Link
              to="/dashboard/addcars"
              className="mt-4 md:mt-0 flex items-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 rounded-lg transition-all duration-300 text-white text-sm font-medium"
            >
              <FaPlus className="w-4 h-4" />
              <span>Add New Car</span>
            </Link>
          </div>

          {/* Table with scrollbar */}
          <div className="overflow-x-auto">
            <div className="max-h-[500px] overflow-y-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">#</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Image</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">City</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Year</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Fuel</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Price</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((prd, index) => (
                    <tr 
                      key={prd._id} 
                      className="border-b border-gray-200 hover:bg-gray-50 transition"
                    >
                      <td className="py-4 px-4">
                        <span className="font-medium text-gray-900">
                          {indexOfFirstItem + index + 1}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="w-16 h-12 rounded-lg overflow-hidden border border-gray-300">
                          <img
                            src={prd.image}
                            alt={prd.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-medium text-gray-900">
                          {prd.name}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-600">
                          {prd.city}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-600">
                          {prd.year}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <FaGasPump className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600">
                            {prd.fuel}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-medium text-gray-900">
                          {prd.price}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/update/${prd._id}`}
                            className="px-3 py-1.5 bg-yellow-500 hover:bg-yellow-600 rounded-lg transition-all duration-300 text-white text-sm font-medium"
                          >
                            <FaEdit className="inline mr-1" /> Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(prd._id)}
                            className="px-3 py-1.5 bg-red-500 hover:bg-red-600 rounded-lg transition-all duration-300 text-white text-sm font-medium"
                          >
                            <FaTrash className="inline mr-1" /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {products.length > 0 && (
            <div className="flex justify-center items-center gap-4 mt-6">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`p-2 rounded-full transition ${
                  currentPage === 1
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-red-500 text-white hover:bg-red-600 shadow-md"
                }`}
              >
                <IoIosArrowBack className="text-xl" />
              </button>
              <span className="font-semibold text-sm text-gray-900">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-full transition ${
                  currentPage === totalPages
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-red-500 text-white hover:bg-red-600 shadow-md"
                }`}
              >
                <IoIosArrowForward className="text-xl" />
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-6 mt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <FaCar className="w-4 h-4 text-red-600" />
                <span className="text-sm text-gray-600">
                  Hadi'sWheelsZone Auto Sales • Premium Dealership
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">
                  System Online
                </span>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              © 2024 Hadi'sWheelsZone Dashboard v2.1.0
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;