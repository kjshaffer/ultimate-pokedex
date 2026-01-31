"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { label: "Pokemon", href: "/pokemon" },
  { label: "Locations", href: "/locations" },
  { label: "Moves", href: "/moves" },
  { label: "Generations", href: "/generations" },
];

export default function Tabs() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap border-b border-gray-200">
      {tabs.map((tab) => {
        const isActive = pathname.startsWith(tab.href);

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`px-2 sm:px-5 py-2 sm:py-4 text-sm sm:text-md rounded-sm font-semibold transition-all duration-200 ${
              isActive
                ? "bg-accent text-white"
                : "text-gray-600 hover:bg-[#f0a880] hover:text-white"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
