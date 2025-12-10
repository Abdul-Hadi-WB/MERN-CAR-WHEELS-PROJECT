import React, { useState } from "react";
import Wheels_Zone1 from "../css/img/Ferrari Main.png";
import Wheels_Zone2 from "../css/img/McLaren Artura (Hybrid).webp";
import Wheels_Zone3 from "../css/img/Audi R8 V10 Performance.jpg";
import Wheels_Zone4 from "../css/img/Aston Martin DB11.jpg";
import Wheels_Zone5 from "../css/img/Bhugati_divo.jpg";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaCarSide, FaTools, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// 🔹 Voice Search Function (Fully safe)
const startVoiceSearch = (setSearch, handleSearch) => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Your browser does not support Voice Search.");
    return;
  }

  try {
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false; // final result only
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setSearch(text);           // Fill input with recognized text
      setTimeout(() => handleSearch(), 300); // Auto-search
    };

    recognition.onerror = (event) => {
      console.error("Voice Recognition Error:", event.error);
      alert("Voice recognition failed. Please allow microphone and try again.");
    };

    recognition.onend = () => {
      // Recognition stopped
    };

  } catch (err) {
    console.error(err);
    alert("Something went wrong with voice recognition.");
  }
};

const Home = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (search.trim() !== "") {
      navigate(`/cars?q=${encodeURIComponent(search)}`);
    }
  };

  return (
    <div>
      {/* ===== HERO SECTION ===== */}
      <div className="relative h-screen overflow-hidden">
        {/* Swiper Background */}
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          speed={1000}
          className="absolute inset-0 z-0"
        >
          {[Wheels_Zone1, Wheels_Zone2, Wheels_Zone3, Wheels_Zone4, Wheels_Zone5].map((img, i) => (
            <SwiperSlide key={i}>
              <div
                className="h-full w-full bg-cover bg-center"
                style={{ backgroundImage: `url('${img}')` }}
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Search Bar */}
        <div className="relative z-20 flex justify-center pt-10 px-4">
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-3/4 lg:w-1/2">
            <input
              type="text"
              placeholder="Search your dream car..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1 w-full px-3 py-2 sm:px-4 sm:py-3 text-black outline-none bg-white/90 placeholder-gray-500 rounded-lg shadow-md text-sm sm:text-base"
            />
           
            <button
              onClick={handleSearch}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-red-700 hover:bg-red-800 text-white font-semibold rounded-lg text-sm sm:text-base shadow-md transition-colors duration-300"
            >
              Search
            </button>
          </div>
        </div>

        {/* Hero Text */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white -mt-16 sm:-mt-24 md:-mt-32 lg:-mt-40 px-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 leading-tight">
            Welcome to Hadi's Wheels Zone
            <br />
            Find the Best Cars
          </h1>
          <p className="text-xs sm:text-xs md:text-sm max-w-xl font-serif">
            Discover premium cars, wheels, and accessories that define luxury and performance.
          </p>
        </div>
      </div>

      {/* ===== CONTACT SECTION ===== */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-red-600 mb-8">
            Contact Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
                Hadi's Wheels Zone
              </h3>
              <p className="text-gray-600 mb-4 text-sm sm:text-base font-serif">
                We are your trusted partner in premium car wheels and auto accessories. Feel free to reach out for inquiries or collaborations.
              </p>
              <div className="space-y-2">
                <p className="flex items-center text-gray-700 text-sm sm:text-base">
                  <FaMapMarkerAlt className="text-red-600 w-4 h-4 mr-2" />123 Main Street, Karachi, Pakistan
                </p>
                <p className="flex items-center text-gray-700 text-sm sm:text-base">
                  <FaPhoneAlt className="text-red-600 w-4 h-4 mr-2" />+92 300 1234567
                </p>
                <p className="flex items-center text-gray-700 text-sm sm:text-base">
                  <FaEnvelope className="text-red-600 w-4 h-4 mr-2" />contact@hadiswheelszone.com
                </p>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
                Send us a message
              </h3>
              <form className="space-y-3">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none text-sm sm:text-base"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none text-sm sm:text-base"
                />
                <textarea
                  placeholder="Your Message"
                  rows="4"
                  className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none text-sm sm:text-base"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-red-700 text-white font-semibold py-2 sm:py-2 rounded-lg shadow-md hover:bg-red-700 transition duration-300 text-sm sm:text-base"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* ===== WHY CHOOSE US SECTION ===== */}
      <div className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-red-600 mb-6">
            Why Choose Hadi’s Wheels Zone?
          </h2>
          <p className="text-gray-700 mb-8 text-sm sm:text-base font-serif">
            We don’t just sell cars — we build long-term trust with our customers. Here’s why thousands of car lovers prefer us for their next vehicle.
          </p>
          <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
            <div className="bg-gray-50 p-3 sm:p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300">
              <FaCarSide className="text-red-700 text-2xl sm:text-3xl mx-auto mb-1 sm:mb-2" />
              <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 text-gray-800">Wide Selection</h3>
              <p className="text-gray-600 text-xs sm:text-sm font-serif">
                From classic beauties to modern hypercars — we’ve got every kind of car for every kind of driver.
              </p>
            </div>
            <div className="bg-gray-50 p-3 sm:p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300">
              <FaTools className="text-red-700 text-2xl sm:text-3xl mx-auto mb-1 sm:mb-2" />
              <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 text-gray-800">Certified Quality</h3>
              <p className="text-gray-600 text-xs sm:text-sm font-serif">
                Each car undergoes a detailed inspection to ensure premium quality and reliability for our clients.
              </p>
            </div>
            <div className="bg-gray-50 p-3 sm:p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300">
              <FaUsers className="text-red-700 text-2xl sm:text-3xl mx-auto mb-1 sm:mb-2" />
              <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 text-gray-800">Customer Satisfaction</h3>
              <p className="text-gray-600 text-xs sm:text-sm font-serif">
                We prioritize your experience with transparent pricing, fast service, and friendly support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
