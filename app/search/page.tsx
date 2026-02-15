import { Suspense } from "react";
import { search, searchEvents } from "@/lib/data/search";
import SearchResults from "@/components/search/search-results";
import SearchInput from "@/components/ui/search-input";
import type { Metadata } from "next";
import PageHeader from "@/components/ui/page-header";
import type {
  SearchResults as SearchResultsType,
  DogShowEvent,
  PaginatedResponse,
} from "@/lib/types";

export const metadata: Metadata = {
  title: "Search",
  description: "Search across dog shows, judges, and dogs.",
  robots: { index: false, follow: true },
};

interface SearchPageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q || "";

  let results: SearchResultsType | null = null;
  let events: PaginatedResponse<DogShowEvent> | null = null;
  if (query.length >= 2) {
    try {
      [results, events] = await Promise.all([
        search(query),
        searchEvents(query),
      ]);
    } catch {
      // API unavailable
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="container-screen px-4 py-10">
        <PageHeader breadcrumbs={[{ label: "Search" }]} />
        <h1 className="mb-6 text-3xl font-bold text-gray-900">Search</h1>

        <Suspense>
          <SearchInput
            placeholder="Search shows, judges, dogs..."
            paramName="q"
            baseUrl="/search"
            className="mb-8 max-w-xl"
          />
        </Suspense>

        {!query && (
          <p className="py-16 text-center text-gray-400">
            Enter a search term to get started.
          </p>
        )}

        {query && query.length < 2 && (
          <p className="py-16 text-center text-gray-400">
            Please enter at least 2 characters.
          </p>
        )}

        {(results || events) && (
          <SearchResults results={results} events={events} />
        )}
      </div>
    </div>
  );
}
