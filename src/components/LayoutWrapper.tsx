'use client';

import React from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from '@/components/Footer';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const isWriter = pathname?.startsWith("/writer");

  const showHeader = !isAdmin && !isWriter;

  return (
    <>
      {showHeader && <Header />}
      <main className="px-8 mx-auto md:px-0 md:max-w-6xl py-10">
        {children}
      </main>
      {showHeader && <Footer />}
    </>
  );
}
