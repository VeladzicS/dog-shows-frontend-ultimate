import { Suspense } from "react";
import { getDogs } from "@/lib/data/dogs";
import { getBreeds } from "@/lib/data/filters";
import DogCard from "@/components/dogs/dog-card";
import DogListFilters from "@/components/dogs/dog-list-filters";
import { FilterBar } from "@/components/filters";
import Pagination from "@/components/ui/pagination";
import EmptyState from "@/components/ui/empty-state";
import type { Metadata } from "next";
import PageHeader from "@/components/ui/page-header";
import type { Dog as DogType, PaginationMeta } from "@/lib/types";

export const metadata: Metadata = {
  title: "Dogs",
  description: "Browse dog profiles, filter by breed, sex, and more.",
};

interface DogsPageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

export default async function DogsPage({ searchParams }: DogsPageProps) {
  const params = await searchParams;

  let dogs: DogType[] = [];
  let meta: PaginationMeta = {
    current_page: 1,
    last_page: 1,
    per_page: 18,
    total: 0,
  };
  let breeds: string[] = [];

  try {
    const [dogsRes, breedsRes] = await Promise.all([
      getDogs({
        search: params.search,
        breed: params.breed,
        sex: params.sex,
        page: params.page,
        per_page: 18,
      }),
      getBreeds(),
    ]);
    dogs = dogsRes.data;
    meta = dogsRes.meta;
    breeds = breedsRes.data;
  } catch {
    // API unavailable
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="container-screen px-4 py-10">
        <PageHeader breadcrumbs={[{ label: "Dogs" }]} />
        <h1 className="mb-6 text-3xl font-bold text-gray-900">Dogs</h1>

        <Suspense>
          <FilterBar>
            <DogListFilters breeds={breeds} />

            <FilterBar.Results>
              {dogs.length === 0 ? (
                <EmptyState />
              ) : (
                <>
                  <p className="mt-6 mb-4 text-sm text-gray-500">
                    {meta.total} {meta.total === 1 ? "dog" : "dogs"} found
                  </p>

                  <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {dogs.map((dog) => (
                      <DogCard key={dog.id} dog={dog} />
                    ))}
                  </div>

                  <Pagination
                    meta={meta}
                    baseUrl="/dogs"
                    searchParams={params}
                    className="mt-10"
                  />
                </>
              )}
            </FilterBar.Results>
          </FilterBar>
        </Suspense>
      </div>
    </div>
  );
}
