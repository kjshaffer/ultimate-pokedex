import BackButton from "@/app/components/BackButton";
import StatBar from "@/app/components/StatBar";
import SearchableCardGrid from "@/app/components/SearchableCardGrid";
import Link from "next/link";

type Pokemon = {
  name: string;
  sprites: {
    front_default: string;
    front_shiny: string;
  };
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  moves: {
    move: {
      name: string;
    };
  }[];
};

type Encounter = {
  location_area: {
    name: string;
    url: string;
  };
};

type Location = {
  name: string;
};

type Props = {
  params: Promise<{
    name: string;
  }>;
};

export default async function PokemonDetailPage({ params }: Props) {
  const { name } = await params;

  // Fetch Pokémon data
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${name}`
  );
  const pokemon: Pokemon = await res.json();

  // Fetch encounter data
  const encountersRes = await fetch(
  `https://pokeapi.co/api/v2/pokemon/${name}/encounters`
  );
  const encounters: Encounter[] = await encountersRes.json();
  
  // Fetch official locations from the API
  const locationsData: Location[] = await Promise.all(
    encounters.map(async (e) => {
      const areaRes = await fetch(e.location_area.url);
      const areaData = await areaRes.json();

      // Use the parent location's name
      return { name: areaData.location.name } as Location;
    })
  );

  // Remove duplicates
  const uniqueLocations = Array.from(
    new Map(locationsData.map((l) => [l.name, l])).values()
  );


  return (
    <div className="mx-auto max-w-6xl p-4 space-y-6">
  
      {/* Title Row */}
      <div className="flex items-center gap-4">
        <BackButton />
  
        <h1 className="text-4xl font-bold text-accent capitalize">
          {pokemon.name}
        </h1>
      </div>
  
      {/* Sprites */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-semibold">
            Default Sprite
          </h2>
  
          <img
            src={pokemon.sprites.front_default}
            className="mx-auto h-40 w-40 [image-rendering:pixelated]"
          />
        </div>
  
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-semibold">
            Shiny Sprite
          </h2>
  
          <img
            src={pokemon.sprites.front_shiny}
            className="mx-auto h-40 w-40 [image-rendering:pixelated]"
          />
        </div>
  
      </div>
  
      {/* Stats */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-2xl font-semibold">
          Stats
        </h2>
  
        <div className="space-y-3">
          {pokemon.stats.map((s) => (
            <StatBar
              key={s.stat.name}
              label={s.stat.name}
              value={s.base_stat}
            />
          ))}
        </div>
      </div>
  
      <SearchableCardGrid
        title="Locations"
        items={uniqueLocations}
        baseHref="/locations"
      />
  
      <SearchableCardGrid
        title="Moves"
        items={pokemon.moves.map(m => ({ name: m.move.name }))}
        baseHref="/moves"
      />
  
    </div>
  );
}
