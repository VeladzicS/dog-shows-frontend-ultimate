import { Suspense } from "react";
import { getJudges } from "@/lib/data/judges";
import { getBreeds } from "@/lib/data/filters";
import JudgeCard from "@/components/judges/judge-card";
import JudgeListFilters from "@/components/judges/judge-list-filters";
import Pagination from "@/components/ui/pagination";
import EmptyState from "@/components/ui/empty-state";
import type { Metadata } from "next";
import PageHeader from "@/components/ui/page-header";
import type { Judge, PaginationMeta } from "@/lib/types";

export const metadata: Metadata = {
  title: "Judges",
  description: "Browse dog show judges and their profiles.",
};

interface JudgesPageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

export default async function JudgesPage({ searchParams }: JudgesPageProps) {
  const params = await searchParams;

  let judges: Judge[] = [];
  let meta: PaginationMeta = {
    current_page: 1,
    last_page: 1,
    per_page: 18,
    total: 0,
  };
  let breeds: string[] = [];

  try {
    const [judgesRes, breedsRes] = await Promise.all([
      getJudges({
        search: params.search,
        specialty: params.specialty,
        page: params.page,
        per_page: 18,
      }),
      getBreeds(),
    ]);
    judges = judgesRes.data;
    meta = judgesRes.meta;
    breeds = breedsRes.data;
  } catch {
    // API unavailable
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="container-screen px-4 py-10">
        <PageHeader breadcrumbs={[{ label: "Judges" }]} />
        <h1 className="mb-6 text-3xl font-bold text-gray-900">Judges</h1>

        <Suspense>
          <JudgeListFilters breeds={breeds} />
        </Suspense>

        {judges.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <p className="mt-6 mb-4 text-sm text-gray-500">
              {meta.total} {meta.total === 1 ? "judge" : "judges"} found
            </p>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {judges.map((judge) => (
                <JudgeCard key={judge.id} judge={judge} />
              ))}
            </div>

            <Pagination
              meta={meta}
              baseUrl="/judges"
              searchParams={params}
              className="mt-10"
            />
          </>
        )}
      </div>
    </div>
  );
}
