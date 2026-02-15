import { getEvents } from "@/lib/data/events";
import EventGridWithAds from "@/components/events/event-grid-with-ads";
import AdSlot from "@/components/ui/ad-slot";
import FilterDateRange from "@/components/filters/filter-date-range";
import Pagination from "@/components/ui/pagination";
import EmptyState from "@/components/ui/empty-state";
import PageHeader from "@/components/ui/page-header";
import type { DogShowEvent, PaginationMeta } from "@/lib/types";

interface MonthPageProps {
  params: Promise<{ year: string; month: string }>;
  searchParams: Promise<Record<string, string | undefined>>;
}

function lastDay(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

const STATIC_YEAR = "2026";

export async function generateStaticParams() {
  return Array.from({ length: 12 }, (_, i) => ({
    year: STATIC_YEAR,
    month: String(i + 1).padStart(2, "0"),
  }));
}

export async function generateMetadata({ params }: MonthPageProps) {
  const { year, month } = await params;
  const monthName = new Date(Number(year), Number(month) - 1).toLocaleString("en-US", { month: "long" });
  return {
    title: `Dog Show Events — ${monthName} ${year}`,
    description: `Browse dog show events for ${monthName} ${year}.`,
  };
}

export default async function MonthPage({ params, searchParams }: MonthPageProps) {
  const { year, month } = await params;
  const sp = await searchParams;

  const yearNum = Number(year);
  const monthNum = Number(month);
  const dateFrom = `${year}-${month}-01`;
  const dateTo = `${year}-${month}-${String(lastDay(yearNum, monthNum)).padStart(2, "0")}`;

  let events: DogShowEvent[] = [];
  let meta: PaginationMeta = {
    current_page: 1,
    last_page: 1,
    per_page: 18,
    total: 0,
  };

  try {
    const eventsRes = await getEvents({
      date_from: dateFrom,
      date_to: dateTo,
      page: sp.page,
      per_page: 18,
    });
    events = eventsRes.data;
    meta = eventsRes.meta;
  } catch {
    // API unavailable
  }

  const monthName = new Date(yearNum, monthNum - 1).toLocaleString("en-US", { month: "long" });

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
                { label: `${monthName} ${year}` },
              ]}
            />
            <h1 className="mb-6 text-3xl font-bold text-gray-900">
              Events — {monthName} {year}
            </h1>

            <FilterDateRange
              currentYear={yearNum}
              currentMonth={month}
            />

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
                  urlBuilder={(page) =>
                    page === 1
                      ? `/events/month/${year}/${month}`
                      : `/events/month/${year}/${month}?page=${page}`
                  }
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
