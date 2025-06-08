"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const publicationOptions = [
  "Web Articles",
  "Issue Briefs",
  "Reserach Reports",
  "Newsletters",
  "WCRT Journal",
  "Scholar Warrior",
  "Books",
  "Essays",
];

const CreateWritersPage = () => {
  const [writers, setWriters] = useState([
    { username: "", password: "", permissions: [] as string[], other: "" },
  ]);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleChange = (
    index: number,
    field: "username" | "password" | "permissions" | "other",
    value: string | string[]
  ) => {
    const updated = [...writers];
    if (field === "permissions") {
      updated[index].permissions = value as string[];
    } else {
      updated[index][field] = value as string;
    }
    setWriters(updated);
  };

  const handlePermissionToggle = (index: number, permission: string) => {
    const updated = [...writers];
    const currentPermissions = updated[index].permissions;

    if (currentPermissions.includes(permission)) {
      updated[index].permissions = currentPermissions.filter((p) => p !== permission);
    } else {
      updated[index].permissions = [...currentPermissions, permission];
    }

    if (permission === "Other" && !updated[index].permissions.includes("Other")) {
      updated[index].other = "";
    }

    setWriters(updated);
  };

  const addWriter = () => {
    setWriters([
      ...writers,
      { username: "", password: "", permissions: [], other: "" },
    ]);
  };

  const removeWriter = (index: number) => {
    const updated = [...writers];
    updated.splice(index, 1);
    setWriters(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Writers to create:", writers);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 4000);
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <h2 className="text-3xl font-bold text-pink-600 mb-10 text-center">
        Create Writer Accounts
      </h2>

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
                value={writer.username}
                spellCheck='false'
                onChange={(e) => handleChange(index, "username", e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 pr-10"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-700">Password</label>
              <input
                type="password"
                value={writer.password}
                onChange={(e) => handleChange(index, "password", e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 pr-10"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-700 font-medium">
                Types of Publications
              </label>
              <div className="space-y-2 pl-1">
                {publicationOptions.map((option) => (
                  <div key={option} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`perm-${index}-${option}`}
                      checked={writer.permissions.includes(option)}
                      onChange={() => handlePermissionToggle(index, option)}
                      className="accent-pink-500"
                    />
                    <label htmlFor={`perm-${index}-${option}`} className="text-gray-800">
                      {option}
                    </label>
                  </div>
                ))}

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`perm-${index}-other`}
                    checked={writer.permissions.includes("Other")}
                    onChange={() => handlePermissionToggle(index, "Other")}
                    className="accent-pink-500"
                  />
                  <label htmlFor={`perm-${index}-other`} className="text-gray-800">
                    Other
                  </label>
                </div>

                {writer.permissions.includes("Other") && (
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
          <button
            type="button"
            onClick={addWriter}
            className="text-gray-700 border border-gray-300 px-5 py-2 rounded-xl hover:bg-gray-100"
          >
            + Add Writer
          </button>

          <button
            type="submit"
            className="bg-pink-500 text-white px-8 py-3 rounded-xl hover:bg-pink-600 shadow-lg transition"
          >
            Submit
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
