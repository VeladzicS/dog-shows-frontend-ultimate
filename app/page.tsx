import { Trophy, Users, Dog, Award } from "lucide-react";
import { getStats } from "@/lib/data/stats";
import { getEvents } from "@/lib/data/events";
import StatCard from "@/components/ui/stat-card";
import AdSlot from "@/components/ui/ad-slot";
import EventGridWithAds from "@/components/events/event-grid-with-ads";
import FilterDateRange from "@/components/filters/filter-date-range";
import Pagination from "@/components/ui/pagination";
import EmptyState from "@/components/ui/empty-state";
import type { Stats, DogShowEvent, PaginationMeta } from "@/lib/types";

export default async function HomePage() {
  let stats: Stats | null = null;
  let events: DogShowEvent[] = [];
  let meta: PaginationMeta = {
    current_page: 1,
    last_page: 1,
    per_page: 36,
    total: 0,
  };
  try {
    const [statsRes, eventsRes] = await Promise.all([
      getStats(),
      getEvents({ per_page: 36 }),
    ]);
    stats = statsRes.data;
    events = eventsRes.data;
    meta = eventsRes.meta;
  } catch {
    // API unavailable — render with empty data
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Leaderboard Ad (replaces Hero) */}
      <section className="bg-zinc-100 border-b border-zinc-200">
        <div className="container mx-auto px-4">
          <AdSlot variant="leaderboard" />
        </div>
      </section>

      {/* Hero — commented out in favour of leaderboard ad */}
      {/*
      <section className="bg-primary py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            Dog Show Results
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-white/80">
            Most comprehensive results, judge profiles, and dog records,
            powered by ShowSight Magazine.
          </p>

          {stats && (
            <div className="mx-auto grid max-w-[650px] grid-cols-1 gap-4 md:grid-cols-3">
              <StatCard
                label="Total Shows"
                value={stats.total_shows}
                icon={Trophy}
                className="border-white/20 bg-white/10 text-white [&_p]:text-white/70  [&_div]:text-white"
              />
              <StatCard
                label="Judges"
                value={stats.total_judges}
                icon={Users}
                className="border-white/20 bg-white/10 text-white [&_p]:text-white/70  [&_div]:text-white"
              />
              <StatCard
                label="Dogs"
                value={stats.total_dogs}
                icon={Dog}
                className="border-white/20 bg-white/10 text-white [&_p]:text-white/70  [&_div]:text-white"
              />
            </div>
          )}
        </div>
      </section>
      */}

      {/* Events Listing + Sidebar */}
      <section className="container-screen px-4 py-10">
        <div className="flex gap-8">
          {/* Main content */}
          <div className="min-w-0 flex-1">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">
              All Events in {new Date().getFullYear()}
            </h2>

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
                  urlBuilder={(page) =>
                    page === 1 ? "/" : `/events/page/${page}`
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
