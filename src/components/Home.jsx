import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="min-h-screen w-full bg-gray-900 p-6 text-white flex flex-col md:flex-row justify-center items-center relative overflow-x-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-contain bg-no-repeat bg-center"
        style={{
          backgroundImage: 'url("/images/rs-logo.png")', // Replace with your image URL
          zIndex: 0,
        }}
      />
      {/* Glass Effect Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-md z-2" />

      {/* Dotted Pattern */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 opacity-20 z-10 hidden md:block">
        <div className="grid grid-cols-12 gap-2">
          {[...Array(48)].map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 bg-red-500 rounded-full shadow-red-500/70 shadow-lg"
            />
          ))}
        </div>
      </div>

      {/* Logo */}
      <div className="absolute top-6 left-6 z-10 shadow-lg shadow-red-500/50 rounded-full">
        <Link to="/">
          <img
            src="/images/logo.png" // Replace with your image URL
            alt="Logo"
            className="w-12 h-12 md:w-16 md:h-16 rounded-full"
          />
        </Link>
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto px-4 md:px-20 py-12 grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        {/* Text Content */}
        <div className="flex flex-col justify-center space-y-6 text-center md:text-left">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Modern
              <br />
              Landing
            </h1>
          </div>

          <p className="text-gray-400 max-w-lg mx-auto md:mx-0">
            Create stunning and impactful web experiences with this modern,
            minimalist design approach.
          </p>

          {/* Date and Time */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zM4 8h12v8H4V8z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-white text-md font-bold">24.02.2025</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 8a1 1 0 00-1-1H7a1 1 0 100 2h2a1 1 0 001-1zm-1 4a1 1 0 100-2H7a1 1 0 100 2h2z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-white text-md font-bold">10:00 AM</span>
            </div>
          </div>

          <a href="/form" className="w-full flex justify-center md:justify-start">
            <button
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 w-3/4 md:w-auto rounded-sm
            transition duration-300 ease-in-out transform hover:-translate-y-1 shadow-lg shadow-red-600/50"
            >
              Get Started
            </button>
          </a>
        </div>

        {/* About Section */}
        <div className="flex flex-col justify-center space-y-4">
          <hr className="w-1/6 mx-auto md:mx-0" />
          <p className="text-gray-300 font-semibold text-lg md:text-xl max-w-md mx-auto md:mx-0">
            This is a modern landing page designed to be minimalist and impactful. It is perfect
            for showcasing your web app or other products.
          </p>
        </div>

        {/* Contact Section */}
        <div className="flex flex-col justify-center space-y-4">
          <hr className="w-1/6 mx-auto md:mx-0" />
          <p className="text-gray-300 font-semibold text-lg md:text-xl max-w-md mx-auto md:mx-0">
            Contact us on our social media platforms or mail us for any queries.
          </p>
          <div className="flex justify-center md:justify-start space-x-6">
            <a
              href="#"
              className="text-gray-400 hover:text-pink-500 transition duration-300 "
            >
              <FaInstagram className="w-12 h-12 md:w-8 md:h-8" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-600 transition duration-300"
            >
              <FaLinkedin className="w-12 h-12 md:w-8 md:h-8" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-red-500 transition duration-300"
            >
              <FaEnvelope className="w-12 h-12 md:w-8 md:h-8" />
            </a>
          </div>


        </div>

        {/* Image Section */}
        <div className="w-full flex justify-center md:justify-start">
          <img
            src="/images/image-1.png" // Replace with your image URL
            alt="Featured"
            className="object-cover rounded-lg shadow-sm hover:shadow-lg hover:shadow-red-900/70 shadow-red-200/20 w-3/4 md:w-2/4 h-auto border-double border-4 border-gray-600"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
