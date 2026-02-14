import { apiFetch } from "@/lib/api";
import type { Judge, DogShow, PaginatedResponse } from "@/lib/types";

export async function getJudges(
  params?: Record<string, string | number | undefined>,
): Promise<PaginatedResponse<Judge>> {
  return apiFetch<PaginatedResponse<Judge>>("/judges", params, ["judges"]);
}

export async function getJudge(slug: string): Promise<{ data: Judge }> {
  return apiFetch<{ data: Judge }>(
    `/judges/${slug}`,
    undefined,
    [`judge-${slug}`],
  );
}

export async function getJudgeShows(
  slug: string,
  params?: Record<string, string | number | undefined>,
): Promise<PaginatedResponse<DogShow>> {
  return apiFetch<PaginatedResponse<DogShow>>(
    `/judges/${slug}/shows`,
    params,
    [`judge-${slug}`],
  );
}
