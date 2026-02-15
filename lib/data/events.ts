import { apiFetch } from "@/lib/api";
import type {
  DogShowEvent,
  EventSummary,
  PaginatedResponse,
} from "@/lib/types";

export async function getEvents(
  params?: Record<string, string | number | undefined>,
): Promise<PaginatedResponse<DogShowEvent>> {
  return apiFetch<PaginatedResponse<DogShowEvent>>(
    "/events",
    params,
    ["events"],
    { revalidate: 60 },
  );
}

export async function getEvent(
  date: string,
  slug: string,
  filters?: { breed?: string; search?: string },
): Promise<{ data: DogShowEvent }> {
  return apiFetch<{ data: DogShowEvent }>(
    `/events/${date}/${slug}`,
    filters,
    ["events"],
    { revalidate: 300 },
  );
}

export async function getEventSummary(
  date: string,
  slug: string,
): Promise<{ data: EventSummary }> {
  return apiFetch<{ data: EventSummary }>(
    `/events/${date}/${slug}/summary`,
    undefined,
    ["events"],
    { revalidate: 300 },
  );
}
