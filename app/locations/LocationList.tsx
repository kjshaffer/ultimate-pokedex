"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Location = {
  name: string;
};

export default function LocationList({
  locations,
}: {
  locations: Location[];
}) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return locations.filter((l) =>
      l.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, locations]);

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4">
      
      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        
        <div>
          <h1 className="text-3xl font-bold text-accent">
            All Locations
          </h1>
          <p className="text-sm text-gray-500">
            Showing {filtered.length} of {locations.length}
          </p>
        </div>

        <input
          type="text"
          placeholder="Search locations..."
          className="rounded-lg border border-gray-200 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Grid */}
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((loc) => (
          <li key={loc.name}>
            <Link
              href={`/locations/${loc.name}`}
              className="block rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="capitalize">
                {loc.name.replaceAll("-", " ")}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
