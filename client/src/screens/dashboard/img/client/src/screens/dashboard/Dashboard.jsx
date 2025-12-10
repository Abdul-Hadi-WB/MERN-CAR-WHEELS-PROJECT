import React from "react";
import { Link } from "react-router-dom";
import { fetchProducts } from "../../redux/actions/productAction";
import { useDispatch,useSelector } from 'react-redux'
import { useEffect } from "react";
import { useAuth } from "../../context/auth";

const Dashboard = () => {

  const dispatch = useDispatch();
  const{loading, products} = useSelector(state => state.productSlice)
  const [auth, setAuth] = useAuth()
  useEffect(()=>{
    dispatch(fetchProducts())
  })

  let items = 1

  console.log('im here' + auth)


  const logout = () => {
       setAuth(null)
       localStorage.removeItem("auth")
       location.href="/login"
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col p-6">

        <h2 className="text-2xl font-bold text-center mb-10 text-red-500">
          Admin Panel
        </h2>

         <h2 className="text-lg font-bold text-center mb-10 text-red-500">
                {auth?.user?.first_name ? auth?.user?.first_name + " " + auth?.user?.last_name : auth?.user?.email  }
        </h2>

       

        <nav className="flex flex-col gap-4">
          <Link to="/dashboard" className="hover:bg-red-600 px-4 py-2 rounded-lg">Dashboard</Link>
          <Link to ="/dashboard/addCars" className="hover:bg-red-600 px-4 py-2 rounded-lg">Add Car</Link>
          <a href="#" className="hover:bg-red-600 px-4 py-2 rounded-lg">Manage Cars</a>
          <a href="#" className="hover:bg-red-600 px-4 py-2 rounded-lg">Users</a>
          <a href="#" className="hover:bg-red-600 px-4 py-2 rounded-lg">Settings</a>
        </nav>

        <button 
            onClick={logout}
        
        
        className="mt-24 flex justify-center items-center bg-red-500 hover:bg-red-600 py-2 rounded-lg text-white font-semibold">
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
          <Link to="/dashboard/addcars" className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600">
            + Add New Car
          </Link>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-gray-500 text-sm">Total Cars</h2>
            <p className="text-3xl font-bold text-red-500">{products.length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-gray-500 text-sm">Total Users</h2>
            <p className="text-3xl font-bold text-red-500">24</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-gray-500 text-sm">Revenue</h2>
            <p className="text-3xl font-bold text-red-500">PKR 4.2 Cr</p>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Manage Cars
          </h2>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3">#</th>
                <th className="p-3">Name</th>
                <th className="p-3">City</th>
                <th className="p-3">Year</th>
                <th className="p-3">Fuel</th>
                <th className="p-3">Price</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {
              products.map((prd) => (
                <tr
                  // key={id}
                  className="border-b hover:bg-gray-100 transition"
                >
                  <td className="p-3">{items++}</td>
                  <td className="p-3">{prd.name}</td>
                  <td className="p-3">{prd.city}</td>
                  <td className="p-3">{prd.year}</td>
                  <td className="p-3">{prd.fuel}</td>
                  <td className="p-3">{prd.price}</td>
                  <td className="p-3 flex justify-center gap-2">
                    <button className="bg-yellow-400 text-white px-3 py-1 rounded-lg hover:bg-yellow-500">
                      Edit
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;