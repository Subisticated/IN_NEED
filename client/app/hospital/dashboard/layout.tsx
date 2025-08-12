"use client";
import Sidebar from "./sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-64 p-4 bg-gray-50">{children}</main>
    </div>
  );
}
