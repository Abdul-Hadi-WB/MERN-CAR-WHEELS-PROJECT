import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaTachometerAlt, FaGasPump, FaPhoneAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../redux/actions/productAction";
import { Link, useLocation } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

const Cars = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();

  const { loading, products } = useSelector(
    (state) => state.productSlice || { products: [], loading: false }
  );

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get("q");
    if (searchQuery) setSearch(searchQuery);
  }, [location]);

  const filteredCars = products
    ? products.filter((car) =>
        car.name?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4 sm:px-6 md:px-8 lg:px-16 max-w-5xl mx-auto">
      {/* Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 text-center md:text-left">
          Available Cars
        </h1>
        <div className="flex w-full md:w-[35%] bg-white shadow-md rounded-lg overflow-hidden">
          <input
            type="text"
            placeholder="Search cars e.g. Ferrari"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 p-2 sm:p-3 outline-none text-gray-700 text-sm sm:text-base"
          />
          <button className="bg-red-600 text-white px-3 sm:px-5 py-2 sm:py-3 font-semibold hover:bg-red-700 transition-colors duration-300 text-sm sm:text-base">
            Search
          </button>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-center text-gray-500 text-sm sm:text-base mt-10">
          Loading cars...
        </p>
      )}

      {/* Cars List */}
      <div className="grid gap-4">
        {!loading && filteredCars.length > 0 ? (
          filteredCars.map((car) => (
            <div
              key={car._id}
              className="bg-white rounded-xl shadow-lg flex flex-col md:flex-row hover:shadow-2xl transition-all duration-300"
            >
              {/* Left Image */}
              <div className="relative md:w-[40%]">
                <img
                  src={car.image || "/placeholder.jpg"}
                  alt={car.name || "Car"}
                  className="h-48 sm:h-52 md:h-56 w-full object-cover rounded-t-xl md:rounded-l-xl md:rounded-t-none"
                />
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-red-600 text-white text-xs sm:text-sm px-2 rounded-md font-semibold">
                  FEATURED
                </div>
              </div>

              {/* Right Info */}
              <div className="flex flex-col justify-between p-3 sm:p-5 md:w-[60%]">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                    {car.name || "Unknown Car"}
                  </h2>
                  <div className="flex flex-wrap items-center text-gray-600 text-xs sm:text-sm mt-2 gap-2 sm:gap-3">
                    {car.city && (
                      <div className="flex items-center gap-1">
                        <FaMapMarkerAlt /> {car.city}
                      </div>
                    )}
                    {car.km && (
                      <div className="flex items-center gap-1">
                        <FaTachometerAlt /> {car.km} km
                      </div>
                    )}
                    {car.fuel && (
                      <div className="flex items-center gap-1">
                        <FaGasPump /> {car.fuel}
                      </div>
                    )}
                    {car.year && <div>{car.year}</div>}
                  </div>

                  {/* Timestamps */}
                  {car.createdAt && (
                    <div className="text-green-600 text-xs sm:text-sm mt-1">
                      Posted{" "}
                      {formatDistanceToNow(new Date(car.createdAt), { addSuffix: true })}
                    </div>
                  )}
                </div>

                {/* Bottom Row */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-3 gap-2 sm:gap-0">
                  <div className="text-lg sm:text-xl font-bold text-blue-700">
                    {car.price || "N/A"}
                  </div>
                  <Link
                    to={`/products/${car._id}`}
                    className="bg-green-600 hover:bg-green-700 text-white px-2.5 sm:px-3 py-2 rounded-md flex items-center gap-1 text-xs sm:text-xs transition-colors duration-300"
                  >
                    <FaPhoneAlt className="text-xs" /> View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          !loading && (
            <p className="text-center text-gray-500 text-sm sm:text-base mt-10">
              No cars found matching your search.
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default Cars;
