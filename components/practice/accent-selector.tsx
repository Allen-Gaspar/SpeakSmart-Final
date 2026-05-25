"use client";

import type { Accent } from "@/lib/languages";
import { MapPin } from "lucide-react";

interface AccentSelectorProps {
  accents: Accent[];
  selectedAccent: string;
  onSelectAccent: (accentId: string) => void;
}

export function AccentSelector({ accents, selectedAccent, onSelectAccent }: AccentSelectorProps) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-primary" />
        Select Accent
      </h3>
      <div className="flex flex-wrap gap-3">
        {accents.map((accent) => (
          <button
            key={accent.id}
            onClick={() => onSelectAccent(accent.id)}
            className={`px-4 py-2 rounded-xl transition-all duration-300 ${
              selectedAccent === accent.id
                ? "bg-primary text-primary-foreground glow-sm"
                : "glass hover:bg-secondary"
            }`}
          >
            <span className="font-medium">{accent.name}</span>
            <span className="text-sm ml-2 opacity-70">({accent.region})</span>
          </button>
        ))}
      </div>
    </div>
  );
}
