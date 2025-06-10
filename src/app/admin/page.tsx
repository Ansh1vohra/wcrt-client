"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Menu } from 'lucide-react';

interface Writer {
  email: string;
  writerName: string;
  fullName: string;
  createdAt?: string;
  categories?: string[];
  isActive?: boolean;
}

export default function AdminDashboard() {
  const [writers, setWriters] = useState<Writer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("admin-token");
    if (!token) {
      router.push("/admin/login");
      return;
    }

    fetchWriters(token);
  }, [router]);

  const fetchWriters = async (token: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/writer`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("admin-token");
          router.push("/admin/login");
          return;
        }
        throw new Error("Failed to fetch writers");
      }

      const data = await response.json();
      setWriters(data.writers || []);
    } catch (err) {
      setError("Failed to load writers");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusToggle = async (email: string, currentStatus: boolean) => {
    // TODO: Implement status toggle API call
    console.log('Toggle status for:', email);
  };

  const handleChangePassword = async (email: string) => {
    // TODO: Implement change password functionality
    console.log('Change password for:', email);
  };

  const handleDelete = async (email: string, writerName: string) => {
    if (!window.confirm(`Are you sure you want to delete writer ${writerName}?`)) {
      return;
    }

    try {
      const token = localStorage.getItem("admin-token");
      if (!token) {
        router.push("/admin/login");
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/api/writer/${writerName}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("admin-token");
          router.push("/admin/login");
          return;
        }
        throw new Error("Failed to delete writer");
      }

      // Update the writers list by removing the deleted writer
      setWriters((prevWriters) =>
        prevWriters.filter((writer) => writer.email !== email)
      );
      setOpenMenuId(null); // Close the dropdown
    } catch (err) {
      setError("Failed to delete writer. Please try again.");
      setTimeout(() => setError(""), 3000); // Clear error after 3 seconds
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white p-8">
        <div className="animate-pulse text-center">Loading writers...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-pink-600">Writers Management</h1>
        <button
          onClick={() => router.push('/admin/createwriters')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add New Writer
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {writers.map((writer) => (
              <tr key={writer.email} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {writer.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleStatusToggle(writer.email, writer.isActive ?? false)}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      writer.isActive ?? false
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {writer.isActive ?? false ? "Active" : "Inactive"}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="relative">
                    <button
                      onClick={() => setOpenMenuId(openMenuId === writer.email ? null : writer.email)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <Menu className="h-5 w-5" />
                    </button>
                    
                    {openMenuId === writer.email && (
                      <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                        <div className="py-1">
                          <button
                            onClick={() => handleChangePassword(writer.email)}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Change Password
                          </button>
                          <button
                            onClick={() => handleDelete(writer.email, writer.writerName)}
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
