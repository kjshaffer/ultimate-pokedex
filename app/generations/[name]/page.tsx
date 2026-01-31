import BackButton from "@/app/components/BackButton";
import SearchableCardGrid from "@/app/components/SearchableCardGrid";
import Link from "next/link";
import { notFound } from "next/navigation";

type Generation = {
  name: string;
  main_region: {
    name: string;
  } | null;
  pokemon_species: {
    name: string;
  }[];
  moves: {
    name: string;
  }[];
};

type Props = {
  params: Promise<{
    name: string;
  }>;
};

export default async function GenerationDetailPage({ params }: Props) {
  const { name } = await params;

  const res = await fetch(
    `https://pokeapi.co/api/v2/generation/${name}`
  );

  if (!res.ok) {
    notFound();
  }

  const gen: Generation = await res.json();

  return (
    <div className="mx-auto max-w-6xl p-4 space-y-6">
  
      {/* Title Row */}
      <div className="flex items-center gap-4">
        <BackButton />
  
        <h1 className="text-3xl font-bold text-accent capitalize">
          {gen.name.replaceAll("-", " ")}
        </h1>
      </div>
  
      {/* Region Card */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">
          Main Region
        </h2>
  
        <p className="text-lg capitalize">
          {gen.main_region ? (
            gen.main_region.name
          ) : (
            <span className="italic text-gray-400">
              Unknown
            </span>
          )}
        </p>
      </div>
  
      <SearchableCardGrid
        title="Pokémon In This Generation"
        items={gen.pokemon_species}
        baseHref="/pokemon"
      />
  
    </div>
  );
}
