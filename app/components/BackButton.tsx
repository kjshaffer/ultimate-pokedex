"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="
        flex items-center gap-2
        rounded-lg
        border border-gray-200
        bg-white
        px-4 py-2
        text-sm font-semibold text-gray-700
        shadow-sm
        transition-all duration-200
        hover:-translate-y-[1px]
        hover:border-[#c86b41]
        hover:text-[#c86b41]
        hover:shadow-md
        active:translate-y-0
      "
    >
      <span className="text-lg">←</span>
      Back
    </button>
  );
}
