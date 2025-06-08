'use client';

import Link from "next/link";

export default function AdminNavbar() {
  return (
    <nav className="bg-black text-white px-6 py-4 flex gap-6 absolute top-0 left-0 w-full">
      <Link href="/admin">Dashboard</Link>
      <Link href="/admin/writers">Writers</Link>
      <Link href="/admin/posts">Posts</Link>
      <Link href="/admin/settings">Website Content</Link>
    </nav>
  );
}
