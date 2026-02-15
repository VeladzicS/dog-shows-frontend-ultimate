const API_BASE_URL = process.env.API_BASE_URL || "";
const API_TOKEN = process.env.API_TOKEN || "";

export async function apiFetch<T>(
  path: string,
  params?: Record<string, string | number | undefined>,
  tags?: string[],
  fetchOptions?: { revalidate?: number; cache?: RequestCache },
): Promise<T> {
  const url = new URL(`${API_BASE_URL}${path}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        url.searchParams.set(key, String(value));
      }
    });
  }

  const allTags = tags ? ["all", ...tags] : ["all"];

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      Accept: "application/json",
    },
    next: {
      tags: allTags,
      ...(fetchOptions?.revalidate !== undefined && {
        revalidate: fetchOptions.revalidate,
      }),
    },
    ...(fetchOptions?.cache !== undefined && { cache: fetchOptions.cache }),
  });

  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${path}`);
  }

  return res.json();
}
