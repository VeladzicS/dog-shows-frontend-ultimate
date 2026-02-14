"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, X } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";

export default function EventShowFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const debouncedSearch = useDebounce(searchQuery, 300);

  // Refs to avoid stale closures in the debounce effect
  const searchParamsRef = useRef(searchParams);
  searchParamsRef.current = searchParams;
  const pathnameRef = useRef(pathname);
  pathnameRef.current = pathname;

  // Sync debounced search value to URL
  useEffect(() => {
    const params = new URLSearchParams(searchParamsRef.current.toString());
    const current = params.get("search") || "";
    if (debouncedSearch === current) return;

    if (debouncedSearch) params.set("search", debouncedSearch);
    else params.delete("search");

    const qs = params.toString();
    router.replace(`${pathnameRef.current}${qs ? `?${qs}` : ""}`, {
      scroll: false,
    });
  }, [debouncedSearch, router]);

  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-xs text-gray-400">Results filter as you type</p>
      <div className="relative w-full sm:max-w-xs">
        <Search
          size={18}
          className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search dogs, owners, judges..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-lg border border-gray-200 py-2.5 pr-10 pl-10 text-sm transition focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 transition hover:text-gray-600"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
