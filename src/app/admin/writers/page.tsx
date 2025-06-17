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

export default function WriterManage() {
  const [writers, setWriters] = useState<Writer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [selectedWriter, setSelectedWriter] = useState<Writer | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
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

  const handleChangePassword = (writer: Writer) => {
    setSelectedWriter(writer);
    setNewPassword("");
  };

  const updatePassword = async () => {
    if (!selectedWriter || !newPassword) return;
    setIsUpdating(true);
    try {
      const token = localStorage.getItem("admin-token");
      if (!token) {
        router.push("/admin/login");
        return;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/writer/${selectedWriter.writerName}/password`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newPassword }),
      });

      if (!response.ok) throw new Error("Failed to update password");
      else alert("Writer Password Updated Successfully");

      setSelectedWriter(null);
    } catch (err) {
      setError("Failed to update password");
      setTimeout(() => setError(""), 3000);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (email: string, writerName: string) => {
    if (!window.confirm(`Are you sure you want to delete writer ${writerName}?`)) return;

    try {
      const token = localStorage.getItem("admin-token");
      if (!token) {
        router.push("/admin/login");
        return;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/writer/${writerName}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("admin-token");
          router.push("/admin/login");
          return;
        }
        throw new Error("Failed to delete writer");
      }

      setWriters((prevWriters) =>
        prevWriters.filter((writer) => writer.email !== email)
      );
      setOpenMenuId(null);
    } catch (err) {
      setError("Failed to delete writer. Please try again.");
      setTimeout(() => setError(""), 3000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white p-6 md:p-8">
        <div className="animate-pulse text-center">Loading writers...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-4 py-6 md:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-pink-600">Writers Management</h1>
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
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Writer Name</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Categories</th>
              <th className="px-4 py-3 text-right font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {writers.map((writer) => (
              <tr key={writer.writerName} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-900">{writer.writerName}</td>
                <td className="px-4 py-3 text-gray-900">{writer.fullName}</td>
                <td className="px-4 py-3 text-gray-900">{writer.email}</td>
                <td className="px-4 py-3 text-gray-900">{writer.categories?.join(', ')}</td>
                <td className="px-4 py-3 text-right font-medium">
                  <div className="relative inline-block text-left">
                    <button
                      onClick={() => setOpenMenuId(openMenuId === writer.writerName ? null : writer.writerName)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <Menu className="h-5 w-5" />
                    </button>
                    {openMenuId === writer.writerName && (
                      <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                        <div className="py-1">
                          <button
                            onClick={() => handleChangePassword(writer)}
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

      {selectedWriter && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 px-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">Change Password</h2>
            <p className="mb-2 text-gray-700">
              Writer: <strong>{selectedWriter.writerName}</strong>
            </p>
            <input
              type="password"
              className="w-full border border-gray-300 p-2 rounded mb-4"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedWriter(null)}
                className="px-4 py-2 bg-gray-300 text-black rounded"
              >
                Cancel
              </button>
              <button
                onClick={updatePassword}
                disabled={isUpdating}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {isUpdating ? "Updating..." : "Update Password"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
