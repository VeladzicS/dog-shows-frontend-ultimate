import { apiFetch } from "@/lib/api";
import type { SearchResults, DogShowEvent, PaginatedResponse } from "@/lib/types";

export async function search(
  q: string,
  type?: string,
  perPage?: number,
): Promise<SearchResults> {
  return apiFetch<SearchResults>(
    "/search",
    { q, type, per_page: perPage },
    ["search"],
  );
}

export async function searchEvents(
  q: string,
  perPage: number = 10,
): Promise<PaginatedResponse<DogShowEvent>> {
  return apiFetch<PaginatedResponse<DogShowEvent>>(
    "/events",
    { search: q, per_page: perPage },
    ["events"],
  );
}
