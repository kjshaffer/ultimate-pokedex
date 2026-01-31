"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Item = {
  name: string;
};

export default function SearchableCardGrid({
  title,
  items,
  baseHref,
}: {
  title: string;
  items: Item[];
  baseHref: string;
}) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return items.filter((i) =>
      i.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [items, search]);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">

      {/* Header Row */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-sm text-gray-500">
            Showing {filtered.length} of {items.length}
          </p>
        </div>

        <input
          type="text"
          placeholder={`Search ${title.toLowerCase()}...`}
          className="rounded-lg border border-gray-200 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Card Grid */}
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {filtered.map((item) => (
          <li key={item.name}>
            <Link
              href={`${baseHref}/${item.name}`}
              className="block rounded-lg border border-gray-200 p-3 text-center capitalize transition hover:bg-gray-50"
            >
              {item.name.replaceAll("-", " ")}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
