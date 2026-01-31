"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import Tabs from "../components/Tabs";

type Generation = {
  name: string;
};

export default function GenerationsPage() {
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchGenerations() {
      const res = await fetch("https://pokeapi.co/api/v2/generation/");
      const data = await res.json();
      setGenerations(data.results);
    }

    fetchGenerations();
  }, []);

  const filtered = useMemo(() => {
    return generations.filter((g) =>
      g.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, generations]);

  return (
    <div>

      {/* Banner */}
      <div className="relative h-[280px] md:h-[360px] w-full overflow-hidden">
        <img
          src="/Charizard.jpg"
          alt="Charizard"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="relative flex h-full items-center justify-center">
          <h1 className="
            text-2xl sm:text-4xl md:text-6xl
            font-black
            text-white
            tracking-wide
            bg-white/10
            backdrop-blur-sm
            px-4 sm:px-8
            py-2 sm:py-4
            rounded-2xl
            text-center
          ">
            ULTIMATE POKEDEX
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-4 pb-4">

        <Tabs />
        
        <div className="mx-auto max-w-6xl space-y-6 p-4">
          {/* Header */}
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            
            <div>
              <h1 className="text-3xl font-bold text-accent">
                All Generations
              </h1>
              <p className="text-sm text-gray-500">
                Showing {filtered.length} of {generations.length}
              </p>
            </div>

            <input
              type="text"
              placeholder="Search generations..."
              className="rounded-lg border border-gray-200 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Grid */}
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((gen) => (
              <li key={gen.name}>
                <Link
                  href={`/generations/${gen.name}`}
                  className="block rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <span className="capitalize">
                    {gen.name.replaceAll("-", " ")}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
