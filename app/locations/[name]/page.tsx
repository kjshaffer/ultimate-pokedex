import BackButton from "@/app/components/BackButton";
import AreaPokemonCard from "@/app/components/AreaPokemonCard";
import Link from "next/link";
import { notFound } from "next/navigation";

type Location = {
  name: string;
  region: {
    name: string;
  } | null;
  areas: {
    name: string;
    url: string;
  }[];
};

type Area = {
  pokemon_encounters: {
    pokemon: {
      name: string;
    };
  }[];
};

type Props = {
  params: Promise<{
    name: string;
  }>;
};

export default async function LocationDetailPage({ params }: Props) {
  const { name } = await params;

  // Fetch location info
  const locationRes = await fetch(
    `https://pokeapi.co/api/v2/location/${name}`
  );

  if (!locationRes.ok) {
    notFound();
  }

  const location: Location = await locationRes.json();

  return (
    <div className="mx-auto max-w-6xl p-4 space-y-6">
  
      {/* Title Row */}
      <div className="flex items-center gap-4">
        <BackButton />
  
        <h1 className="text-4xl font-bold text-accent capitalize">
          {location.name.replaceAll("-", " ")}
        </h1>
      </div>
  
      {/* Region Card */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-2 text-xl font-semibold">Region</h2>
  
        <p className="text-lg capitalize">
          {location.region ? location.region.name : "None"}
        </p>
      </div>
  
      {/* Areas */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Areas</h2>
  
        {location.areas.length === 0 ? (
          <p className="italic text-gray-500">
            No areas available for this location.
          </p>
        ) : (
          <div className="space-y-6">
            {await Promise.all(
              location.areas.map(async (area) => {
                const areaRes = await fetch(area.url);
                const areaData: Area = await areaRes.json();
  
                return (
                  <AreaPokemonCard
                    key={area.name}
                    areaName={area.name}
                    pokemon={areaData.pokemon_encounters.map((p) => ({
                      name: p.pokemon.name,
                    }))}
                  />
                );
              })
            )}
          </div>
        )}
      </div>
  
    </div>
  );
}
