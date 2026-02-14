import { SearchX } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title?: string;
  message?: string;
  className?: string;
}

export default function EmptyState({
  title = "No results found",
  message = "Try adjusting your search or filters to find what you're looking for.",
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 text-center",
        className,
      )}
    >
      <SearchX size={48} className="mb-4 text-gray-300" />
      <h3 className="mb-2 text-lg font-semibold text-gray-700">{title}</h3>
      <p className="max-w-md text-sm text-gray-500">{message}</p>
    </div>
  );
}
