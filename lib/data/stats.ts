import { apiFetch } from "@/lib/api";
import type { Stats } from "@/lib/types";

export async function getStats(): Promise<{ data: Stats }> {
  return apiFetch<{ data: Stats }>("/stats", undefined, ["stats"], {
    revalidate: 900,
  });
}
