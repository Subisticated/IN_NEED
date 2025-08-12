"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

const menu = [
  { label: "Dashboard Overview", href: "/hospital/dashboard/overview" },
  {
    label: "Manage Donors",
    children: [
      { label: "Alive Donors", href: "/hospital/dashboard/donors/alive" },
      { label: "Deceased Donors", href: "/hospital/dashboard/donors/deceased" },
    ],
  },
  {
    label: "Manage Requests",
    children: [
      { label: "Blood Requests", href: "/hospital/dashboard/requests/blood" },
      { label: "Organ Requests", href: "/hospital/dashboard/requests/organ" },
    ],
  },
  { label: "Inventory Management", href: "/hospital/dashboard/inventory" },
  { label: "Ambulance Services", href: "/hospital/dashboard/ambulance" },
  { label: "Hospital Profile", href: "/hospital/dashboard/profile" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <aside className="fixed z-30 h-screen w-64 bg-white border-r shadow-lg flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <span className="font-bold text-lg">Hospital Portal</span>
        <button className="md:hidden" onClick={() => setOpen(!open)}>☰</button>
      </div>
      <nav className={cn("flex-1 flex flex-col gap-2 p-4", open ? "" : "hidden md:flex")}> 
        {menu.map((item, idx) =>
          item.children ? (
            <div key={idx}>
              <div className="font-semibold">{item.label}</div>
              <div className="ml-4 flex flex-col gap-1">
                {item.children.map((sub, i) => (
                  <Link key={i} href={sub.href} className={cn("p-2 rounded hover:bg-blue-100", pathname === sub.href && "bg-blue-200 font-bold")}>{sub.label}</Link>
                ))}
              </div>
            </div>
          ) : (
            <Link key={idx} href={item.href} className={cn("p-2 rounded hover:bg-blue-100", pathname === item.href && "bg-blue-200 font-bold")}>{item.label}</Link>
          )
        )}
      </nav>
    </aside>
  );
}
