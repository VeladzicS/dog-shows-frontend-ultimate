"use client";

import { useRef } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFilterBar } from "./filter-bar";

interface FilterSearchProps {
  paramName?: string;
  placeholder?: string;
  className?: string;
}

export default function FilterSearch({
  paramName = "search",
  placeholder = "Search...",
  className,
}: FilterSearchProps) {
  const { updateFilter, getFilter } = useFilterBar();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    updateFilter(paramName, inputRef.current?.value.trim() || "");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex w-full items-center gap-2 sm:max-w-md", className)}
    >
      <div className="relative flex-1">
        <Search
          size={18}
          className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
        />
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          defaultValue={getFilter(paramName)}
          maxLength={100}
          className="w-full rounded-lg border border-gray-200 py-2.5 pr-4 pl-10 text-sm transition focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="shrink-0 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-primary/90"
      >
        Search
      </button>
    </form>
  );
}
