"use client";

import React from "react";
import { useRouter } from "next/navigation";

const AdminDashboard = () => {
  const router = useRouter();

  const goToCreateWriters = () => {
    router.push("/admin/createwriters");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-24 px-6 bg-white">
      <h1 className="text-4xl font-bold text-pink-600 mb-12">Admin Dashboard</h1>

      <div className="w-full max-w-xl bg-white shadow-xl rounded-3xl p-10 border border-gray-200 transition hover:shadow-2xl">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Create Writers</h2>
        <p className="text-gray-600 mb-6">
          Add writer accounts and assign specific permissions.
        </p>
        <button
          onClick={goToCreateWriters}
          className="w-full bg-pink-500 text-white py-3 rounded-xl hover:bg-pink-600 transition text-lg font-medium"
        >
          + Create Writers
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
