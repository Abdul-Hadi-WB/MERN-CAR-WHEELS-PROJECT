import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCar } from "../redux/actions/productAction";

const Single = () => {
  const dispatch = useDispatch();
  const { loading, product } = useSelector((state) => state.productSlice);
  const { id } = useParams();

  useEffect(() => {
    if (id) dispatch(fetchCar(id));
  }, [dispatch, id]);

  if (loading) return <p className="text-center text-gray-500 mt-10">Loading...</p>;
  if (!product) return <p className="text-center text-gray-500 mt-10">No data found</p>;

  return (
  <div className="max-w-2xl mx-auto mt-10 shadow-lg rounded-2xl overflow-hidden border border-gray-200 bg-white">

    {/* Top Image */}
    <div className="w-full h-64 overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover"
      />
    </div>

    {/* Bottom Details */}
    <div className="p-5 space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
      <p className="text-gray-700 text-sm leading-relaxed">{product.description}</p>

      <div className="grid grid-cols-3 gap-4 border-t pt-4 text-gray-700 text-sm">
        <div>
          <p className="text-xs text-gray-500">Model</p>
          <p className="font-semibold">{product.model}</p>
        </div>

        <div>
          <p className="text-xs text-gray-500">Price</p>
          <p className="font-semibold text-green-600">${product.price}</p>
        </div>

        <div>
          <p className="text-xs text-gray-500">Year</p>
          <p className="font-semibold">{product.year}</p>
        </div>
      </div>

      <button className="w-full mt-4 bg-black text-white py-2 rounded-lg text-sm hover:bg-gray-800 transition">
        Book Test Drive
      </button>
    </div>
  </div>
);
};

export default Single;
