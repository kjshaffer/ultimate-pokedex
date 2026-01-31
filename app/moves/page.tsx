import MoveList from "./MoveList";
import Tabs from "../components/Tabs";

type Move = {
  name: string;
  url: string;
};

export default async function MovesPage() {
  const res = await fetch(
    "https://pokeapi.co/api/v2/move?limit=1000"
  );
  const data = await res.json();

  return (
    <div>
      <div className="relative h-[280px] md:h-[360px] w-full overflow-hidden">
        <img src="/Charizard.jpg" alt="Charizard" className="absolute inset-0 w-full h-full object-cover object-top" />

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

      <div className="px-4 pb-4 max-w-6xl mx-auto">
        <Tabs />
        <MoveList moves={data.results as Move[]} />
      </div>
    </div>
  );
}
