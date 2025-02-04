import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Success() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5); // Start countdown from 5

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          navigate("/");
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-6 animate-fade-in">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md text-center transform transition-all duration-300 scale-105">
        {/* Centered Success Check Icon */}
        <div className="flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mx-auto mb-4">
          <svg
            className="w-12 h-12 text-green-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m7 2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
        <p className="text-gray-600 mt-3">
          Thank you for your payment. Your registration is now complete.
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-6 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-all duration-200 ease-in-out"
        >
          Go to Home
        </button>

        {/* Dynamic Countdown Timer */}
        <p className="text-sm text-gray-500 mt-4">
          Redirecting in <span className="font-medium">{countdown}</span> seconds...
        </p>
      </div>
    </div>
  );
}

export default Success;