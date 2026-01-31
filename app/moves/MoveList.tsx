"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Move = {
  name: string;
};

export default function MoveList({ moves }: { moves: Move[] }) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return moves.filter((m) =>
      m.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, moves]);

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4">
      
      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        
        <div>
          <h1 className="text-3xl font-bold text-accent">
            All Moves
          </h1>
          <p className="text-sm text-gray-500">
            Showing {filtered.length} of {moves.length}
          </p>
        </div>

        <input
          type="text"
          placeholder="Search moves..."
          className="rounded-lg border border-gray-200 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Grid */}
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((move) => (
          <li key={move.name}>
            <Link
              href={`/moves/${move.name}`}
              className="block rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="capitalize">
                {move.name.replaceAll("-", " ")}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
