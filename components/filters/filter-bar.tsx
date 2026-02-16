"use client";

import {
  createContext,
  useContext,
  useCallback,
  useTransition,
  type ReactNode,
} from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface FilterBarContextValue {
  updateFilter: (key: string, value: string) => void;
  updateFilters: (entries: Record<string, string>) => void;
  getFilter: (key: string) => string;
  isPending: boolean;
}

const FilterBarContext = createContext<FilterBarContextValue | null>(null);

export function useFilterBar() {
  const ctx = useContext(FilterBarContext);
  if (!ctx) throw new Error("useFilterBar must be used inside <FilterBar>");
  return ctx;
}

/* ── Provider (no layout, just context) ── */

export default function FilterBar({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.delete("page");
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`);
      });
    },
    [router, pathname, searchParams],
  );

  const updateFilters = useCallback(
    (entries: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(entries).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });
      params.delete("page");
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`);
      });
    },
    [router, pathname, searchParams],
  );

  const getFilter = useCallback(
    (key: string) => searchParams.get(key) || "",
    [searchParams],
  );

  return (
    <FilterBarContext value={{ updateFilter, updateFilters, getFilter, isPending }}>
      {children}
    </FilterBarContext>
  );
}

/* ── Controls bar (filter inputs layout) ── */

interface FilterControlsProps {
  children: ReactNode;
  className?: string;
  hint?: string;
}

export function FilterControls({ children, className, hint }: FilterControlsProps) {
  const { isPending } = useFilterBar();

  return (
    <div className="flex flex-col gap-1.5">
      {hint && <p className="text-xs text-gray-400">{hint}</p>}
      <div
        className={cn(
          "flex flex-wrap items-center gap-3",
          isPending && "opacity-70",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}

/* ── Results wrapper (dims + loading indicator while pending) ── */

export function FilterResults({ children, className }: { children: ReactNode; className?: string }) {
  const { isPending } = useFilterBar();

  return (
    <div className={cn("relative", className)}>
      {isPending && (
        <div className="absolute inset-x-0 top-0 z-10 flex justify-center pt-12">
          <div className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 shadow-lg ring-1 ring-black/5 backdrop-blur-sm">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <span className="text-sm font-medium text-gray-500">Loading...</span>
          </div>
        </div>
      )}
      <div
        className={cn(
          "transition-opacity duration-200",
          isPending && "pointer-events-none opacity-40",
        )}
      >
        {children}
      </div>
    </div>
  );
}
