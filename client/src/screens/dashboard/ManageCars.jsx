import axios from "axios";
import React, { useState, useEffect } from "react";
import apis from "../../config/apis";
import { errorToast, successToast } from "../../helpers/toastify";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import UploadImage from "./UploadImage";
import { formatDistanceToNow } from "date-fns";

const inputClass =
  "border rounded-md p-2 pl-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400";

export const AddCarForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    year: "",
    km: "",
    fuel: "",
    price: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${apis.cars}/addCars`, formData);
      if (data?.message) {
        successToast(data.message);
        navigate("/dashboard");
      } else if (data?.error) {
        errorToast(data.error);
      }
    } catch (err) {
      console.log("Add Error:", err.message);
      errorToast("Failed to add car");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4 relative">
      <Link
        to="/dashboard"
        className="absolute top-4 left-4 flex items-center gap-2 text-white bg-red-500 px-3 py-1.5 rounded-md font-semibold hover:bg-red-600 transition text-sm"
      >
        <FaArrowLeft className="text-sm" /> Back to Dashboard
      </Link>

      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full">
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
            Add Car Details
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              name="name"
              placeholder="Car Name"
              value={formData.name}
              onChange={handleChange}
              className={inputClass}
              required
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className={inputClass}
              required
            />
            <input
              type="number"
              name="year"
              placeholder="Year"
              value={formData.year}
              onChange={handleChange}
              className={inputClass}
              required
            />
            <input
              type="text"
              name="km"
              placeholder="KM Driven"
              value={formData.km}
              onChange={handleChange}
              className={inputClass}
              required
            />
            <input
              type="text"
              name="fuel"
              placeholder="Fuel Type"
              value={formData.fuel}
              onChange={handleChange}
              className={inputClass}
              required
            />
            <input
              type="text"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className={inputClass}
              required
            />
            <input
              type="text"
              name="image"
              placeholder="Image URL or name"
              value={formData.image}
              onChange={handleChange}
              className={`${inputClass} col-span-2`}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold mt-4 py-2 rounded-md hover:bg-blue-600 transition text-sm"
          >
            Add Car
          </button>
        </form>

        {/* Upload Image Section */}
        <div className="flex flex-col items-center justify-center border border-gray-300 rounded-xl p-4 bg-gray-50 shadow-inner">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Click here to Upload</h3>
          <UploadImage setFormData={setFormData} />
        </div>
      </div>
    </div>
  );
};

export const UpdateCarForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    year: "",
    km: "",
    fuel: "",
    price: "",
    image: "",
    createdAt: "",
    updatedAt: "",
  });

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const { data } = await axios.get(`${apis.cars}/${id}`);
        if (data?._id) setFormData(data);
        else errorToast("Car not found");
      } catch (err) {
        console.log("Fetch Error:", err.message);
        errorToast("Failed to load car details");
      }
    };
    fetchCar();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`${apis.cars}/update/${id}`, formData);
      if (data?.message) {
        successToast(data.message);
        navigate("/cars");
      } else if (data?.error) {
        errorToast(data.error);
      }
    } catch (err) {
      console.log("Update Error:", err.message);
      errorToast("Failed to update car");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4 relative">
      <Link
        to="/dashboard"
        className="absolute top-4 left-4 flex items-center gap-2 text-white bg-red-500 px-3 py-1.5 rounded-md font-semibold hover:bg-red-600 transition text-sm"
      >
        <FaArrowLeft className="text-sm" /> Back to Dashboard
      </Link>

      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <form onSubmit={handleSubmit} className="w-full">
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
            Update Car Details
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              name="name"
              placeholder="Car Name"
              value={formData.name}
              onChange={handleChange}
              className={inputClass}
              required
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className={inputClass}
              required
            />
            <input
              type="number"
              name="year"
              placeholder="Year"
              value={formData.year}
              onChange={handleChange}
              className={inputClass}
              required
            />
            <input
              type="text"
              name="km"
              placeholder="KM Driven"
              value={formData.km}
              onChange={handleChange}
              className={inputClass}
              required
            />
            <input
              type="text"
              name="fuel"
              placeholder="Fuel Type"
              value={formData.fuel}
              onChange={handleChange}
              className={inputClass}
              required
            />
            <input
              type="text"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className={inputClass}
              required
            />
            <input
              type="text"
              name="image"
              placeholder="Image URL or name"
              value={formData.image}
              onChange={handleChange}
              className={`${inputClass} col-span-2`}
            />
          </div>

          {/* Display Timestamps */}
          {formData.createdAt && (
            <div className="col-span-2 text-sm text-green-600 mt-2">
              Created: {formatDistanceToNow(new Date(formData.createdAt), { addSuffix: true })}
            </div>
          )}
          {formData.updatedAt && (
            <div className="col-span-2 text-sm text-blue-600 mt-1">
              Last Updated: {formatDistanceToNow(new Date(formData.updatedAt), { addSuffix: true })}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold mt-4 py-2 rounded-md hover:bg-blue-600 transition text-sm"
          >
            Update Car
          </button>
        </form>

        <div className="flex flex-col items-center justify-center border border-gray-300 rounded-xl p-4 bg-gray-50 shadow-inner">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Click here to Upload</h3>
          <UploadImage setFormData={setFormData} />
        </div>
      </div>
    </div>
  );
};


export const handleDelete = async (id, dispatch) => {
  const confirm = window.confirm("Are you sure you want to delete this car?")

  if (confirm){
    try {
    const {data} = await axios.delete(`${apis.cars}/delete/${id}`);
    if(data?.message){
      successToast(data.message)
    }
  } catch (err) {
    console.error("Delete Error:", err.message);
    errorToast("Failed to delete car");
  }
  }
  
};






