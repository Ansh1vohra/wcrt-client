'use client';
import React from 'react';

const DonatePage = () => {
  const handleDonate = () => {
    // Replace this with your actual Stripe payment link
    window.location.href = 'https://buy.stripe.com/test_a1b2c3d4e5f6g7h8i9';
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <img
        src="/donate.png"
        alt="Donate Icon"
        className="w-60 h-80 mb-16"
      />
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Support Our Work</h1>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        Your contribution helps us continue building awesome products. Every donation counts!
      </p>
      <button
        onClick={handleDonate}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition duration-300"
      >
        Donate Now
      </button>
    </div>
  );
};

export default DonatePage;
