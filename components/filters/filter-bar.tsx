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

interface FilterBarProps {
  children: ReactNode;
  className?: string;
  hint?: string;
}

export default function FilterBar({ children, className, hint }: FilterBarProps) {
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
    </FilterBarContext>
  );
}
