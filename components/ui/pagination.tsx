import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PaginationMeta } from "@/lib/types";

interface PaginationProps {
  meta: PaginationMeta;
  baseUrl?: string;
  searchParams?: Record<string, string | undefined>;
  urlBuilder?: (page: number) => string;
  className?: string;
}

export default function Pagination({
  meta,
  baseUrl,
  searchParams = {},
  urlBuilder,
  className,
}: PaginationProps) {
  if (meta.last_page <= 1) return null;

  function buildUrl(page: number) {
    if (urlBuilder) return urlBuilder(page);
    const params = new URLSearchParams();
    Object.entries(searchParams).forEach(([k, v]) => {
      if (v) params.set(k, v);
    });
    params.set("page", String(page));
    return `${baseUrl}?${params.toString()}`;
  }

  const pages = getVisiblePages(meta.current_page, meta.last_page);

  return (
    <nav className={cn("flex items-center justify-center gap-1", className)}>
      {meta.current_page > 1 && (
        <Link
          href={buildUrl(meta.current_page - 1)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:bg-gray-50"
        >
          <ChevronLeft size={16} />
        </Link>
      )}

      {pages.map((page, i) =>
        page === "..." ? (
          <span key={`ellipsis-${i}`} className="px-2 text-gray-400">
            ...
          </span>
        ) : (
          <Link
            key={page}
            href={buildUrl(page as number)}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition",
              page === meta.current_page
                ? "bg-primary text-white"
                : "border border-gray-200 text-gray-700 hover:bg-gray-50",
            )}
          >
            {page}
          </Link>
        ),
      )}

      {meta.current_page < meta.last_page && (
        <Link
          href={buildUrl(meta.current_page + 1)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:bg-gray-50"
        >
          <ChevronRight size={16} />
        </Link>
      )}
    </nav>
  );
}

function getVisiblePages(
  current: number,
  total: number,
): (number | "...")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "...")[] = [1];

  if (current > 3) pages.push("...");

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (current < total - 2) pages.push("...");

  pages.push(total);

  return pages;
}
