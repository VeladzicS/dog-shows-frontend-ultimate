"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRef, useTransition } from "react";

interface SearchInputProps {
  placeholder?: string;
  paramName?: string;
  baseUrl?: string;
  className?: string;
}

export default function SearchInput({
  placeholder = "Search...",
  paramName = "search",
  baseUrl,
  className,
}: SearchInputProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = inputRef.current?.value.trim() || "";
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(paramName, value);
    } else {
      params.delete(paramName);
    }
    params.delete("page");

    const target = baseUrl || window.location.pathname;
    startTransition(() => {
      router.push(`${target}?${params.toString()}`);
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex items-center gap-2", isPending && "opacity-70", className)}
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
          defaultValue={searchParams.get(paramName) || ""}
          maxLength={100}
          className="w-full rounded-lg border border-gray-200 py-2.5 pr-4 pl-10 text-base sm:text-sm transition focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="shrink-0 rounded-lg bg-primary px-5 py-2.5 text-base sm:text-sm font-medium text-white transition hover:bg-primary/90"
      >
        Search
      </button>
    </form>
  );
}
