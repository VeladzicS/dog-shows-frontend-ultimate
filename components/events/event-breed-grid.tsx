import Link from "next/link";
import { Dog, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import EventBreedSelect from "./event-breed-select";
import type { BreedStat } from "@/lib/types";

interface EventBreedGridProps {
  breeds: BreedStat[];
  basePath: string;
  className?: string;
}

export default function EventBreedGrid({
  breeds,
  basePath,
  className,
}: EventBreedGridProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-gray-900">
          Breeds ({breeds.length})
        </h2>
        <EventBreedSelect
          breeds={breeds.map((b) => b.name)}
          basePath={basePath}
        />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {breeds.map((breed) => (
          <Link
            key={breed.name}
            href={`${basePath}?breed=${encodeURIComponent(breed.name)}`}
            className="group rounded-xl border border-gray-200 bg-white px-4 py-3.5 transition hover:border-primary/30 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-semibold text-gray-800 transition group-hover:text-primary">
                {breed.name}
              </h3>
              <Dog
                size={15}
                className="mt-0.5 shrink-0 text-gray-300 transition group-hover:text-primary/50"
              />
            </div>
            <div className="mt-1.5 text-xs text-gray-400">
              <span>{breed.entry_count} entries</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
