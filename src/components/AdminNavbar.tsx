'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react"; // optional: install `lucide-react` for icons

export default function AdminNavbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("admin-token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLoginRedirect = () => {
    router.push("/admin/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("admin-token");
    setIsLoggedIn(false);
    router.push("/admin/login");
  };

  return (
    <nav className="bg-gray-800 text-white p-4 md:p-6 fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo or Title */}
        <div className="text-lg font-semibold cursor-pointer"
          onClick={()=>{router.push("/admin")}}
        >WCRT Admin Pannel</div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex gap-6 items-center">
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/writers">Writers</Link>
          <Link href="/admin/posts">Posts</Link>
          <Link href="/admin/site-content">Website Content</Link>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={handleLoginRedirect}
              className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 px-4">
          <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</Link>
          <Link href="/admin/writers" onClick={() => setIsMobileMenuOpen(false)}>Writers</Link>
          <Link href="/admin/posts" onClick={() => setIsMobileMenuOpen(false)}>Posts</Link>
          <Link href="/admin/settings" onClick={() => setIsMobileMenuOpen(false)}>Website Content</Link>

          {isLoggedIn ? (
            <button
              onClick={() => {
                handleLogout();
                setIsMobileMenuOpen(false);
              }}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => {
                handleLoginRedirect();
                setIsMobileMenuOpen(false);
              }}
              className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
