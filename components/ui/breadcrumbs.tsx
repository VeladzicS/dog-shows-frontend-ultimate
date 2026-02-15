import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-y-0.5 gap-x-1.5 text-sm text-gray-500">
      <Link
        href="/"
        className="flex shrink-0 items-center gap-1 transition hover:text-primary"
      >
        <Home size={14} />
        <span>Home</span>
      </Link>

      {items.map((item, i) => (
        <span key={i} className="flex min-w-0 items-center gap-1.5">
          <ChevronRight size={14} className="shrink-0 text-gray-300" />
          {item.href ? (
            <Link href={item.href} className="max-w-48 truncate transition hover:text-primary" title={item.label}>
              {item.label}
            </Link>
          ) : (
            <span className="max-w-48 truncate font-medium text-gray-700" title={item.label}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
