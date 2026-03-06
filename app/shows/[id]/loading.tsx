import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center">
      <Loader2
        className="h-10 w-10 animate-spin"
        style={{ color: "var(--color-primary)" }}
      />
      <p className="mt-4 text-sm font-medium text-gray-400">Loading...</p>
    </div>
  );
}
