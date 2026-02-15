import { apiFetch } from "@/lib/api";
import type { Dog, DogResult, PaginatedResponse } from "@/lib/types";

export async function getDogs(
  params?: Record<string, string | number | undefined>,
): Promise<PaginatedResponse<Dog>> {
  return apiFetch<PaginatedResponse<Dog>>("/dogs", params, ["dogs"], {
    revalidate: 60,
  });
}

export async function getDog(slug: string): Promise<{ data: Dog }> {
  return apiFetch<{ data: Dog }>(`/dogs/${slug}`, undefined, [`dog-${slug}`], {
    revalidate: 300,
  });
}

export async function getDogResults(
  slug: string,
  params?: Record<string, string | number | undefined>,
): Promise<PaginatedResponse<DogResult>> {
  return apiFetch<PaginatedResponse<DogResult>>(
    `/dogs/${slug}/results`,
    params,
    [`dog-${slug}`],
    { revalidate: 60 },
  );
}
