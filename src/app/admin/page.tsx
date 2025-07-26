'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Users, FileText, Layout } from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("admin-token");
    if (!token) {
      router.push("/admin/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <div role="status" className="text-center mt-20 text-lg">
      <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>;
  }

  const handleRedirect = (path: string) => {
    router.push(path);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard of WCRT</h1>
      <p className="mb-8">Welcome! Use the cards below to manage the site.</p>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div
          onClick={() => handleRedirect("/admin/writers")}
          className="bg-white shadow-md rounded-lg p-6 cursor-pointer hover:shadow-xl transition"
        >
          <Users className="text-pink-600 w-10 h-10 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Writer Management</h2>
          <p>Manage writer accounts, permissions, and content contributions.</p>
        </div>

        <div
          onClick={() => handleRedirect("/admin/posts")}
          className="bg-white shadow-md rounded-lg p-6 cursor-pointer hover:shadow-xl transition"
        >
          <FileText className="text-blue-600 w-10 h-10 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Post Management</h2>
          <p>Approve or delete posts submitted by writers.</p>
        </div>

        <div
          onClick={() => handleRedirect("/admin/site-content")}
          className="bg-white shadow-md rounded-lg p-6 cursor-pointer hover:shadow-xl transition"
        >
          <Layout className="text-green-600 w-10 h-10 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Website Content Management</h2>
          <p>Update static website content and configuration.</p>
        </div>

        <div
          onClick={() => handleRedirect("/admin/comments")}
          className="bg-white shadow-md rounded-lg p-6 cursor-pointer hover:shadow-xl transition"
        >
          <FileText className="text-yellow-600 w-10 h-10 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Comments Approval</h2>
          <p>Review and approve user comments.</p>
        </div>
      </div>
    </div>
  );
}
