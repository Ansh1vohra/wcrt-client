"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Add your real API call and validation here
    // If successful:
    router.push("/admin/admindashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-4xl h-[600px] shadow-lg rounded-xl overflow-hidden flex">
        {/* Left: Form */}
        <div className="w-1/2 p-10 bg-white flex flex-col justify-center">
          <h2 className="text-3xl font-semibold text-pink-600 mb-2">Admin Login</h2>
          <p className="text-gray-600 mb-6">Welcome back! Please enter your details</p>

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-gray-700 mb-1">Username</label>
              <input
                type="text"
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 pr-10"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-2 flex items-center px-2 text-gray-500 hover:text-pink-600 focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
              </div>
              <div className="text-right text-sm mt-1">
                <a href="#" className="text-pink-500 hover:underline">
                  Forgot password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-md transition duration-300"
            >
              Log in
            </button>
          </form>

          <p className="text-sm text-gray-600 mt-6">
            Don’t have an account?{" "}
            <a href="#" className="text-pink-500 hover:underline">
              Sign up
            </a>
          </p>
        </div>

        {/* Right: Image */}
        <div className="w-1/2 hidden md:block h-full">
          <img
            src="/article.jpg"
            alt="Login visual"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
