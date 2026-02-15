import { apiFetch } from "@/lib/api";
import type { DogShow, PaginatedResponse } from "@/lib/types";

export async function getShows(
  params?: Record<string, string | number | undefined>,
): Promise<PaginatedResponse<DogShow>> {
  return apiFetch<PaginatedResponse<DogShow>>(
    "/dog-shows",
    params,
    ["dog-shows"],
    { revalidate: 60 },
  );
}

export async function getShow(id: number | string): Promise<{ data: DogShow }> {
  return apiFetch<{ data: DogShow }>(
    `/dog-shows/${id}`,
    undefined,
    ["dog-shows"],
    { revalidate: 300 },
  );
}

export async function getUpcomingShows(
  params?: Record<string, string | number | undefined>,
): Promise<PaginatedResponse<DogShow>> {
  return apiFetch<PaginatedResponse<DogShow>>(
    "/shows/upcoming",
    params,
    ["dog-shows"],
    { revalidate: 60 },
  );
}
