import AdminNavbar from "@/components/AdminNavbar";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AdminNavbar />
        <main className="px-4 py-14">{children}</main>
      </body>
    </html>
  );
}
