"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

export default function AreaPokemonCard({
  areaName,
  pokemon,
}: {
  areaName: string;
  pokemon: { name: string }[];
}) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return pokemon.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [pokemon, search]);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div>
          <h3 className="font-semibold capitalize text-lg">
            {areaName.replaceAll("-", " ")}
          </h3>
          <p className="text-sm text-gray-500">
            Showing {filtered.length} of {pokemon.length}
          </p>
        </div>

        <input
          type="text"
          placeholder="Search Pokémon..."
          className="rounded-lg border border-gray-200 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-accent"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Grid */}
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {filtered.map((p) => (
          <li key={p.name}>
            <Link
              href={`/pokemon/${p.name}`}
              className="block rounded-lg border border-gray-200 p-3 text-center capitalize transition hover:bg-gray-50"
            >
              {p.name}
            </Link>
          </li>
        ))}
      </ul>

    </div>
  );
}
