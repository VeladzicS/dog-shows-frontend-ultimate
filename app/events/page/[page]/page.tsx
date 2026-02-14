import { getEvents } from "@/lib/data/events";
import EventGridWithAds from "@/components/events/event-grid-with-ads";
import AdSlot from "@/components/ui/ad-slot";
import FilterDateRange from "@/components/filters/filter-date-range";
import Pagination from "@/components/ui/pagination";
import EmptyState from "@/components/ui/empty-state";
import PageHeader from "@/components/ui/page-header";
import type { DogShowEvent, PaginationMeta } from "@/lib/types";

interface AllEventsPageProps {
  params: Promise<{ page: string }>;
}

export function generateStaticParams() {
  return [
    { page: "2" },
    { page: "3" },
    { page: "4" },
    { page: "5" },
  ];
}

export async function generateMetadata({ params }: AllEventsPageProps) {
  const { page } = await params;
  return {
    title: `Dog Show Events — Page ${page}`,
    description: `Browse all dog show events, page ${page}.`,
  };
}

function allEventsUrlBuilder(page: number) {
  return page === 1 ? "/" : `/events/page/${page}`;
}

export default async function AllEventsPage({ params }: AllEventsPageProps) {
  const { page } = await params;
  const pageNum = Number(page);

  let events: DogShowEvent[] = [];
  let meta: PaginationMeta = {
    current_page: pageNum,
    last_page: 1,
    per_page: 18,
    total: 0,
  };

  try {
    const eventsRes = await getEvents({ page: pageNum, per_page: 18 });
    events = eventsRes.data;
    meta = eventsRes.meta;
  } catch {
    // API unavailable
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Leaderboard Ad */}
      <section className="bg-zinc-100 border-b border-zinc-200">
        <div className="container mx-auto px-4">
          <AdSlot variant="leaderboard" />
        </div>
      </section>

      <section className="container-screen px-4 py-10">
        <div className="flex gap-8">
          {/* Main content */}
          <div className="min-w-0 flex-1">
            <PageHeader
              breadcrumbs={[
                { label: "Events", href: "/" },
                { label: `Page ${pageNum}` },
              ]}
            />
            <h1 className="mb-6 text-3xl font-bold text-gray-900">
              All Events in {new Date().getFullYear()}
            </h1>

            <FilterDateRange />

            {events.length === 0 ? (
              <EmptyState />
            ) : (
              <>
                <p className="mt-6 mb-4 text-sm text-gray-500">
                  {meta.total} {meta.total === 1 ? "event" : "events"} found
                </p>

                <EventGridWithAds events={events} adEveryN={9} />

                <Pagination
                  meta={meta}
                  urlBuilder={allEventsUrlBuilder}
                  className="mt-10"
                />
              </>
            )}
          </div>

          {/* Sidebar Ad */}
          <aside className="hidden w-[200px] shrink-0 lg:block">
            <AdSlot variant="sidebar" />
          </aside>
        </div>
      </section>
    </div>
  );
}
