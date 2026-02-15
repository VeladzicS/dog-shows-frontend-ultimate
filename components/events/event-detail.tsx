import Link from "next/link";
import { Calendar, Trophy, Star, MapPin } from "lucide-react";
import ShowEntriesTable from "@/components/events/show-entries-table";
import EventShowFilters from "@/components/events/event-show-filters";
import EventBreedGrid from "@/components/events/event-breed-grid";
import BackButton from "@/components/ui/back-button";
import type { EventShow, BreedStat } from "@/lib/types";

interface EventMeta {
  name: string;
  date: string;
  location?: string;
  show_count: number;
  total_entries: number;
}

interface EventDetailProps {
  event: EventMeta;
  basePath: string;
  breeds: BreedStat[];
  specialBreeds?: BreedStat[];
  selectedBreed?: string;
  shows: EventShow[];
  highlight?: string;
}

function ShowCard({
  show,
  highlight,
}: {
  show: EventShow;
  highlight?: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      <div className="border-b border-gray-100 px-2 py-4 md:px-6">
        <h2 className="text-lg font-bold text-gray-900">{show.show_name}</h2>
        <p className="text-sm text-gray-500">
          {show.breed} &middot; Judge:{" "}
          {show.judge_slug ? (
            <Link
              href={`/judges/${show.judge_slug}`}
              className="text-primary hover:underline"
            >
              {show.judge}
            </Link>
          ) : (
            show.judge
          )}
        </p>
      </div>

      {show.entries && show.entries.length > 0 && (
        <ShowEntriesTable entries={show.entries} highlight={highlight} />
      )}

      {(!show.entries || show.entries.length === 0) && (
        <p className="px-6 py-8 text-center text-sm text-gray-400">
          No entry data available for this show.
        </p>
      )}
    </div>
  );
}

export default function EventDetail({
  event,
  basePath,
  breeds,
  specialBreeds = [],
  selectedBreed,
  shows,
  highlight,
}: EventDetailProps) {
  const isSpecialSelected = specialBreeds.some(
    (sb) => sb.name === selectedBreed,
  );
  const showGrid = breeds.length > 1 && !selectedBreed && !isSpecialSelected;
  const showBreedResults =
    !isSpecialSelected && (breeds.length === 1 || !!selectedBreed);

  return (
    <div>
      <BackButton className="mb-6" />

      <div className="mb-8">
        <h1 className="mb-3 text-3xl font-bold text-gray-900">{event.name}</h1>

        <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1.5">
            <Calendar size={15} />
            {event.date}
          </span>
          {event.location && (
            <span className="flex items-center gap-1.5">
              <MapPin size={15} />
              {event.location}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Trophy size={15} />
            {event.show_count} {event.show_count === 1 ? "show" : "shows"}{" "}
            &middot; {event.total_entries} entries
          </span>
        </div>
      </div>

      {/* Special (non-breed) show cards above breeds */}
      {specialBreeds.length > 0 && !selectedBreed && !isSpecialSelected && (
        <div className="mb-6 space-y-3">
          <h2 className="text-lg font-bold text-gray-900">Group & Best in Show Winners</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {specialBreeds.map((sb) => (
              <Link
                key={sb.name}
                href={`${basePath}?breed=${encodeURIComponent(sb.name)}`}
                className="group rounded-xl border border-primary/20 bg-primary/5 px-4 py-3.5 transition hover:border-primary/40 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-semibold text-gray-800 transition group-hover:text-primary">
                    {sb.name}
                  </h3>
                  <Star
                    size={15}
                    className="mt-0.5 shrink-0 text-primary/40 transition group-hover:text-primary"
                  />
                </div>
                <div className="mt-1.5 flex items-center gap-3 text-xs text-gray-400">
                  <span>{sb.entry_count} entries</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Special show results view */}
      {isSpecialSelected && (
        <>
          <div className="mb-4">
            <h2 className="text-lg font-bold text-gray-900">
              {selectedBreed}
            </h2>
          </div>

          <div className="mb-6">
            <EventShowFilters />
          </div>

          <div className="space-y-8">
            {shows.map((show) => (
              <ShowCard key={show.id} show={show} highlight={highlight} />
            ))}

            {shows.length === 0 && (
              <p className="py-12 text-center text-gray-400">
                No shows match your filters.
              </p>
            )}
          </div>
        </>
      )}

      {/* Breed grid */}
      {showGrid && <EventBreedGrid breeds={breeds} basePath={basePath} />}

      {/* Breed results view */}
      {showBreedResults && (
        <>
          {selectedBreed && (
            <div className="mb-4">
              <h2 className="text-lg font-bold text-gray-900">
                {selectedBreed}
              </h2>
            </div>
          )}

          <div className="mb-6">
            <EventShowFilters />
          </div>

          <div className="space-y-8">
            {shows.map((show) => (
              <ShowCard key={show.id} show={show} highlight={highlight} />
            ))}

            {shows.length === 0 && (
              <p className="py-12 text-center text-gray-400">
                No shows match your filters.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
