import BackButton from "@/app/components/BackButton";
import SearchableCardGrid from "@/app/components/SearchableCardGrid";
import Link from "next/link";
import { notFound } from "next/navigation";

type Move = {
  name: string;
  accuracy: number | null;
  pp: number;
  power: number | null;
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
    };
    version_group: {
      name: string;
    };
  }[];
  learned_by_pokemon: {
    name: string;
  }[];
};

type Props = {
  params: Promise<{
    name: string;
  }>;
};

export default async function MoveDetailPage({ params }: Props) {
  const { name } = await params;

  const res = await fetch(
    `https://pokeapi.co/api/v2/move/${name}`
  );

  if (!res.ok) {
    notFound();
  }

  const move: Move = await res.json();

  const flavorTexts = move.flavor_text_entries.filter(
    (f) => f.language.name === "en"
  );

  return (
    <div className="mx-auto max-w-6xl p-4 space-y-6">
  
      {/* Title Row */}
      <div className="flex items-center gap-4">
        <BackButton />
  
        <h1 className="text-3xl font-bold text-accent capitalize">
          {move.name.replaceAll("-", " ")}
        </h1>
      </div>
  
      {/* Stats */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">
          Move Stats
        </h2>
  
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-lg border border-gray-200 p-4 text-center">
            <p className="text-sm text-gray-500">Accuracy</p>
            <p className="text-xl font-semibold">
              {move.accuracy ?? "—"}
            </p>
          </div>
  
          <div className="rounded-lg border border-gray-200 p-4 text-center">
            <p className="text-sm text-gray-500">PP</p>
            <p className="text-xl font-semibold">
              {move.pp}
            </p>
          </div>
  
          <div className="rounded-lg border border-gray-200 p-4 text-center">
            <p className="text-sm text-gray-500">Power</p>
            <p className="text-xl font-semibold">
              {move.power ?? "—"}
            </p>
          </div>
        </div>
      </div>
  
      {/* Flavor Text */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">
          Flavor Text
        </h2>
  
        <ul className="space-y-3">
          {flavorTexts.map((f, i) => (
            <li
              key={i}
              className="rounded-lg border border-gray-200 p-4"
            >
              <p className="text-sm font-semibold capitalize text-gray-500 mb-1">
                {f.version_group.name.replaceAll("-", " ")}
              </p>
  
              <p>
                {f.flavor_text.replaceAll("\n", " ")}
              </p>
            </li>
          ))}
        </ul>
      </div>
  
      <SearchableCardGrid
        title="Pokémon That Learn This Move"
        items={move.learned_by_pokemon}
        baseHref="/pokemon"
      />
      
    </div>
  );
}
