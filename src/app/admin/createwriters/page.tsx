"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const publicationOptions = [
  "web-articles",
  "issue-briefs",
  "manekshaw-papers",
  "newsletter",
  "wcrt-journal",
  "scholar-warrior",
  "books",
  "essay",
  "intern-articles",
  "external-publications"
];

const CreateWritersPage = () => {
  const [writers, setWriters] = useState([
    { 
      writerName: "", 
      writerPassword: "", 
      fullName: "",
      email: "",
      categories: [] as string[], 
      other: "" 
    },
  ]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Check for admin token
  useEffect(() => {
    const token = localStorage.getItem("admin-token");
    if (!token) {
      router.push("/admin/login");
    }
  }, [router]);

  const handleChange = (
    index: number,
    field: "writerName" | "writerPassword" | "fullName" | "email" | "categories" | "other",
    value: string | string[]
  ) => {
    const updated = [...writers];
    if (field === "categories") {
      updated[index].categories = value as string[];
    } else {
      updated[index][field] = value as string;
    }
    setWriters(updated);
  };

  const handleCategoryToggle = (index: number, category: string) => {
    const updated = [...writers];
    const currentCategories = updated[index].categories;

    if (currentCategories.includes(category)) {
      updated[index].categories = currentCategories.filter((c) => c !== category);
    } else {
      updated[index].categories = [...currentCategories, category];
    }

    if (category === "Other" && !updated[index].categories.includes("Other")) {
      updated[index].other = "";
    }

    setWriters(updated);
  };

  const addWriter = () => {
    setWriters([
      ...writers,
      { 
        writerName: "", 
        writerPassword: "", 
        fullName: "",
        email: "",
        categories: [], 
        other: "" 
      },
    ]);
  };

  const removeWriter = (index: number) => {
    const updated = [...writers];
    updated.splice(index, 1);
    setWriters(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate at least one category is selected
    if (writers[0].categories.length === 0) {
      setError("Please select at least one publication type");
      return;
    }

    setLoading(true);
    const token = localStorage.getItem("admin-token");
    if (!token) {
      router.push("/admin/login");
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/writer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(writers[0]),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 4000);
        // Clear form after successful creation
        setWriters([{ 
          writerName: "", 
          writerPassword: "", 
          fullName: "",
          email: "",
          categories: [], 
          other: "" 
        }]);
      } else {
        if (response.status === 401) {
          localStorage.removeItem("admin-token");
          router.push("/admin/login");
        } else {
          setError(data.error || data.message || "Failed to create writers");
        }
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <h2 className="text-3xl font-bold text-pink-600 mb-10 text-center">
        Create Writer Account
      </h2>

      {error && (
        <div className="max-w-3xl mx-auto mb-6">
          <div className="bg-red-50 text-red-500 p-3 rounded-md">
            {error}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl mx-auto">
        {writers.map((writer, index) => (
          <div
            key={index}
            className="bg-white shadow-lg p-8 rounded-3xl space-y-5 border border-gray-100"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-semibold text-gray-800">
                Writer {index + 1}
              </h3>
              {writers.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeWriter(index)}
                  className="text-red-500 text-sm px-2 py-1 rounded-md hover:bg-red-100 transition"
                >
                  Remove
                </button>
              )}
            </div>

            <div>
              <label className="block mb-1 text-gray-700">Username</label>
              <input
                type="text"
                value={writer.writerName}
                spellCheck='false'
                onChange={(e) => handleChange(index, "writerName", e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 pr-10"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-700">Password</label>
              <input
                type="password"
                value={writer.writerPassword}
                onChange={(e) => handleChange(index, "writerPassword", e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 pr-10"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-700">Full Name</label>
              <input
                type="text"
                value={writer.fullName}
                onChange={(e) => handleChange(index, "fullName", e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 pr-10"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-700">Email</label>
              <input
                type="email"
                value={writer.email}
                onChange={(e) => handleChange(index, "email", e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 pr-10"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-700 font-medium">
                Types of Publications <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2 pl-1">
                <div className="mb-2">
                  <button
                    type="button"
                    onClick={() => {
                      const updated = [...writers];
                      if (updated[index].categories.length === publicationOptions.length) {
                        updated[index].categories = [];
                      } else {
                        updated[index].categories = [...publicationOptions];
                      }
                      setWriters(updated);
                    }}
                    className="text-sm text-pink-600 hover:text-pink-700 underline mb-2"
                  >
                    {writers[index].categories.length === publicationOptions.length ? 'Unselect All' : 'Select All'}
                  </button>
                </div>
                {publicationOptions.map((option) => (
                  <div key={option} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`cat-${index}-${option}`}
                      checked={writer.categories.includes(option)}
                      onChange={() => handleCategoryToggle(index, option)}
                      className="accent-pink-500"
                    />
                    <label htmlFor={`cat-${index}-${option}`} className="text-gray-800">
                      {option}
                    </label>
                  </div>
                ))}

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`cat-${index}-other`}
                    checked={writer.categories.includes("Other")}
                    onChange={() => handleCategoryToggle(index, "Other")}
                    className="accent-pink-500"
                  />
                  <label htmlFor={`cat-${index}-other`} className="text-gray-800">
                    Other
                  </label>
                </div>

                {writer.categories.includes("Other") && (
                  <input
                    type="text"
                    placeholder="Specify other"
                    value={writer.other}
                    onChange={(e) => handleChange(index, "other", e.target.value)}
                    className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 pr-10"
                  />
                )}
              </div>
            </div>
          </div>
        ))}

        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* <button
            type="button"
            onClick={addWriter}
            className="text-gray-700 border border-gray-300 px-5 py-2 rounded-xl hover:bg-gray-100"
          >
            + Add Writer
          </button> */}

          <button
            type="submit"
            className="bg-pink-500 text-white px-8 py-3 rounded-xl hover:bg-pink-600 shadow-lg transition"
          >
            {loading ? "Creating..." : "Submit"}
          </button>
        </div>

        {success && (
          <p className="text-green-600 font-semibold text-center pt-4">
            Writer accounts created successfully!
          </p>
        )}
      </form>
    </div>
  );
};

export default CreateWritersPage;
