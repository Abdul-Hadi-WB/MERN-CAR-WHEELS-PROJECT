import React from "react";
import bgCars from "../css/img/Cars.jpg";
import bmw from "../css/img/bmw.jpg";
import ferrari from "../css/img/ferrari.jpg";
import lambo from "../css/img/lamborgini.jpg";
import mcleran from "../css/img/mcleran.jpg";

import bmwLogo from "../css/img/bmw.2.jpg";
import ferrariLogo from "../css/img/Ferrrari.png";
import lamboLogo from "../css/img/Lamborghini.jpg";
import mclarenLogo from "../css/img/mclaren.jpg";
import audiLogo from "../css/img/Audi.png";
import bugattiLogo from "../css/img/bhugaati.jpg";
import porscheLogo from "../css/img/porsche.jpg";

const About = () => {
  return (
    <div className="w-full">

      {/* Hero Section */}
      <div
        className="relative min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${bgCars})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 text-white py-16 px-4 flex flex-col items-center text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-red-500 drop-shadow-md">
            About Hadi's Wheels Zone
          </h1>

          {/* Hero Paragraph */}
          <p className="text-xs sm:text-sm md:text-base max-w-3xl text-gray-200 mb-8 font-serif">
            Welcome to <span className="text-red-400 font-semibold">Hadi’s Wheels Zone</span> —
            the ultimate destination for luxury car lovers. We bring you the
            world’s most iconic cars that redefine performance, speed, and
            design. Experience the power and elegance that drives passion.
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold text-red-400 mt-6 mb-3 drop-shadow-sm">
            Our Top Rated Selling Cars
          </h2>

          <div className="w-24 h-[2px] bg-red-500 rounded-full mb-8"></div>

          {/* Car Showcase */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto w-full">
            {[
              { img: bmw, title: "BMW M8 Competition", desc: "Luxury & Power — 617 HP, twin-turbo V8." },
              { img: ferrari, title: "Ferrari 488 GTB", desc: "Italian engineering perfection with unmatched performance." },
              { img: lambo, title: "Lamborghini Aventador", desc: "Bold design and V12 power — a true beast." },
              { img: mcleran, title: "McLaren 911 Turbo S", desc: "Precision, class, and performance in timeless design." }
            ].map((car, index) => (
              <div
                key={index}
                className="bg-black/60 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-all duration-300 border border-red-400 w-full max-w-xs mx-auto"
              >
                <img src={car.img} alt={car.title} className="w-full h-72 object-cover" />
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-red-500 mb-2">{car.title}</h2>

                  {/* Car Description */}
                  <p className="text-gray-400 text-sm font-serif">{car.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* Learn More About Us Section — UPDATED */}
      <div className="bg-white text-gray-800 py-10 px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="max-w-3xl mx-auto">

          <h2 className="text-2xl sm:text-3xl font-bold text-center text-red-600 mb-6">
            Learn More About Us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-[#fff3f3] p-3 rounded-lg shadow-md hover:shadow-lg border border-red-100">
              <h3 className="text-lg sm:text-xl font-semibold text-red-700 mb-1">🚀 Our Mission</h3>

              <p className="text-gray-700 text-sm sm:text-base font-serif">
                To bring the world’s top luxury and sports cars to passionate car lovers.
                We connect you with cars that embody design, performance, and innovation.
              </p>
            </div>

            <div className="bg-[#f9f9f9] p-3 rounded-lg shadow-md hover:shadow-lg border border-gray-100">
              <h3 className="text-lg sm:text-xl font-semibold text-red-700 mb-1">🌍 Our Vision</h3>

              <p className="text-gray-700 text-sm sm:text-base font-serif">
                Our vision is to become the most trusted luxury car hub where enthusiasts
                find their dream vehicles, backed by our dedication to quality and service.
              </p>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="bg-[#fff5f5] p-4 sm:p-5 rounded-lg mb-8 shadow-md">
            <h3 className="text-xl sm:text-2xl font-semibold text-red-700 mb-1 text-center">
              💎 Why Choose Us?
            </h3>

            <p className="text-gray-700 text-sm sm:text-base text-center max-w-3xl mx-auto leading-relaxed font-serif">
              At <span className="font-semibold text-red-700">Hadi’s Wheels Zone</span>, we don’t just sell cars — we deliver dreams.
              Our commitment to authenticity, performance, and design ensures every car exceeds expectations.
            </p>
          </div>

          {/* Trusted Brands Logos */}
          <div className="bg-[#fff4f4] py-4 sm:py-6 rounded-lg shadow-sm">
            <h3 className="text-lg sm:text-xl font-semibold text-center text-red-700 mb-3">
              Our Trusted Brands
            </h3>

            <div className="max-w-6xl mx-auto grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 gap-6 items-center justify-items-center px-4 sm:px-6">
              {[bmwLogo, ferrariLogo, lamboLogo, mclarenLogo, audiLogo, bugattiLogo, porscheLogo].map((logo, i) => (
                <img
                  key={i}
                  src={logo}
                  alt="Brand Logo"
                  className="rounded-full object-cover hover:scale-110 transition duration-300"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default About;
