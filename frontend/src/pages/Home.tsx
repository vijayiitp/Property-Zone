import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import PropertyCard from "../components/PropertyCard";
import RotatingGlobe from "../components/RotatingGlobe";
import PropertyForm from "../components/PropertyForm";
import { FaSearchLocation, FaEye, FaHome, FaSmile } from "react-icons/fa";
import { useAppSelector } from "../app/hooks";

const Home: React.FC = () => {
  return (
    <section>
      <Banner />
      <AppointmentSection />
      <StatsSection />
      <Property />
    </section>
  );
};

const Banner: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row">
      {/* Left Column */}
      <div className="w-full md:w-1/2">
        <PropertyForm />
      </div>

      {/* Right Column (Globe visible only on md and larger) */}
      <div className="hidden md:flex justify-center md:justify-end items-center w-full md:w-1/2 min-h-[300px] md:min-h-screen">
        <RotatingGlobe />
      </div>
    </div>
  );
};


const AppointmentSection: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 rounded-2xl text-white py-10 sm:py-14 px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
        
        {/* Left Content Block */}
        <div className="bg-slate-800 p-6 sm:p-8 rounded-xl shadow-lg text-center md:text-left">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 leading-snug">
            Find your{" "}
            <span className="text-orange-400">perfect appointment</span> the easy way
          </h2>
          <p className="text-slate-300 mb-6 text-base sm:text-lg">
            Discover the most efficient way to book, visit, and enjoy your appointments without hassle.
          </p>
          <button className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition duration-300 font-semibold w-full sm:w-auto">
            Get Started
          </button>
        </div>

        {/* Right Grid of Action Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-slate-700 p-4 sm:p-6 rounded-xl flex flex-col items-center text-center shadow-md hover:shadow-lg transition">
            <FaSearchLocation className="text-orange-400 text-2xl sm:text-3xl mb-3 sm:mb-4" />
            <p className="font-semibold text-sm sm:text-base text-white">Search your location</p>
          </div>
          <div className="bg-slate-700 p-4 sm:p-6 rounded-xl flex flex-col items-center text-center shadow-md hover:shadow-lg transition">
            <FaEye className="text-orange-400 text-2xl sm:text-3xl mb-3 sm:mb-4" />
            <p className="font-semibold text-sm sm:text-base text-white">Visit Appointment</p>
          </div>
          <div className="bg-slate-700 p-4 sm:p-6 rounded-xl flex flex-col items-center text-center shadow-md hover:shadow-lg transition">
            <FaHome className="text-orange-400 text-2xl sm:text-3xl mb-3 sm:mb-4" />
            <p className="font-semibold text-sm sm:text-base text-white">Get your dream house</p>
          </div>
          <div className="bg-slate-700 p-4 sm:p-6 rounded-xl flex flex-col items-center text-center shadow-md hover:shadow-lg transition">
            <FaSmile className="text-orange-400 text-2xl sm:text-3xl mb-3 sm:mb-4" />
            <p className="font-semibold text-sm sm:text-base text-white">Enjoy your Appointment</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatsSection: React.FC = () => {
  const stats = [
    {
      id: 1,
      value: "$15.4M",
      description: "Revenue from property transactions",
      icon: "💰",
    },
    {
      id: 2,
      value: "25K+",
      description: "Successful buy & sell properties",
      icon: "🏡",
    },
    {
      id: 3,
      value: "$7.2M",
      description: "Investment handled",
      icon: "📈",
    },
    {
      id: 4,
      value: "600+",
      description: "Happy & regular clients",
      icon: "😊",
    },
  ];

  return (
    <section className="bg-slate-900/90 backdrop-blur-md rounded-2xl text-white m-3 sm:m-5 py-10 sm:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 text-center">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="flex flex-col items-center space-y-2 sm:space-y-3 hover:scale-105 transition-transform duration-300"
          >
            <div className="text-3xl sm:text-4xl bg-gradient-to-br from-orange-400 to-orange-600 text-white p-3 sm:p-4 rounded-full shadow-lg">
              {stat.icon}
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold">{stat.value}</h3>
            <p className="text-xs sm:text-sm text-gray-300">{stat.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};


const Property: React.FC = () => {
  const { properties, loading } = useAppSelector((state) => state.property);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollRef.current;
    let scrollAmount = 0;
    const scrollStep = 2;
    const scrollInterval = 30;

    const interval = setInterval(() => {
      if (container) {
        scrollAmount += scrollStep;
        container.scrollLeft += scrollStep;

        if (scrollAmount >= container.scrollWidth - container.clientWidth) {
          scrollAmount = 0;
          container.scrollLeft = 0;
        }
      }
    }, scrollInterval);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full flex flex-col gap-6 px-6 py-10">
      {/* Header Section */}
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center text-white text-3xl font-bold bg-gradient-to-r from-slate-600 via-gray-400 to-gray-600 p-6 rounded-lg shadow-lg">
          <h2>Featured Properties</h2>
          <Link
            to="/properties"
            className="text-white bg-black bg-opacity-30 px-4 py-2 rounded hover:bg-opacity-50 hover:text-yellow-300 hover:underline transition duration-300 text-lg"
          >
            Explore All →
          </Link>
        </div>

        {/* Property Categories */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center font-semibold text-white">
          {[
            { type: "Resident", color: "bg-sky-500" },
            { type: "Commercial", color: "bg-yellow-500" },
            { type: "Industrial", color: "bg-gray-600" },
            { type: "Agriculture", color: "bg-green-600" },
          ].map(({ type, color }, i) => (
            <div
              key={i}
              className={`${color} p-5 rounded-lg shadow-md hover:scale-105 transition duration-300`}
            >
              {type} Property
            </div>
          ))}
        </div>
      </div>

      {/* Carousel */}
      <div className="overflow-hidden -mx-6">
        <div
          ref={scrollRef}
          className="flex gap-6 flex-nowrap px-6 py-6 overflow-x-auto scroll-smooth hide-scrollbar"
        >
          {loading ? (
            <p className="text-white">Loading...</p>
          ) : properties.length > 0 ? (
            properties.map((product, index) => (
              <div key={index} className="min-w-[280px] max-w-[280px]">
                <PropertyCard product={product} />
              </div>
            ))
          ) : (
            <p className="text-white">No properties found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;
