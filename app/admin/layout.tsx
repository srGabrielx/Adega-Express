"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Basic route protection for the admin dashboard
    if (pathname === "/admin") {
      const isAuth = sessionStorage.getItem("admin_auth");
      if (isAuth !== "true") {
        router.replace("/admin/login");
      }
    }
  }, [pathname, router]);

  return (
    <div className="fixed inset-0 z-[100] bg-zinc-50 overflow-y-auto">
      {children}
    </div>
  );
}
