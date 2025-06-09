"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const AdminDashboard = () => {
  const router = useRouter();
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const writers = [
    { name: "Riya Mehta", email: "riya@example.com", role: "Editor" },
    { name: "Arjun Patel", email: "arjun@example.com", role: "Contributor" },
    { name: "Zoya Khan", email: "zoya@example.com", role: "Writer" },
  ];

  const goToCreateWriters = () => {
    router.push("/admin/createwriters");
  };

  const handleMenuToggle = (index: number) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  const handleChangePassword = () => {
    alert("Change Password");
    setOpenMenuIndex(null);
  };

  const handleLogout = () => {
    alert("Logout");
    setOpenMenuIndex(null);
  };

  // Close menu when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpenMenuIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <div className="flex items-center justify-between px-8 py-5 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-pink-600">Admin Panel</h1>

        <button
          onClick={goToCreateWriters}
          className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-xl text-sm font-medium shadow"
        >
          + Create Writers
        </button>
      </div>

      {/* Writer List */}
      <div className="px-8 pt-10 max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Writers</h2>

        <div className="space-y-4">
          {writers.map((writer, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-white p-5 rounded-2xl border border-gray-200 shadow hover:shadow-md transition relative"
            >
              <div>
                <h3 className="text-lg font-bold text-gray-800">{writer.name}</h3>
                <p className="text-sm text-gray-600">{writer.email}</p>
                <span className="inline-block mt-1 text-xs text-pink-600 font-medium bg-pink-50 px-3 py-1 rounded-full">
                  {writer.role}
                </span>
              </div>

              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => handleMenuToggle(index)}
                  className="text-xl px-2 py-1 rounded-full hover:bg-gray-100"
                >
                  ⋮
                </button>

                {openMenuIndex === index && (
                  <div className="absolute right-0 top-8 w-44 bg-white shadow-lg rounded-xl border border-gray-200 z-50 text-sm">
                    <button
                      onClick={handleChangePassword}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Change Password
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
