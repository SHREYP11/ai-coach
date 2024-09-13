"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const routes = [
  { name: "Home", path: "/" },
  { name: "Chat", path: "/chat" },
  { name: "Profile", path: "/profile" },
];

function Navbar() {
  const pathname = usePathname();

  return (
    <div className="p-4 flex flex-row justify-between items-center bg-black text-white">
      <Link href="/" className="text-2xl font-bold mr-4">
        doc<span className="text-red-500">Coach</span>
      </Link>
      
      {/* Add flex-wrap for mobile screens */}
      <div className="flex flex-wrap gap-x-4 text-lg items-center ml-auto">
        {routes.map((route, idx) => (
          <Link
            key={idx}
            href={route.path}
            className={
              pathname === route.path
                ? "text-red-500 border-b-2 border-red-500"
                : ""
            }
          >
            {route.name}
          </Link>
        ))}
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}

export default Navbar;
