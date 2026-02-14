import Link from "next/link";
import { Calendar, MapPin, Trophy, User } from "lucide-react";
import Badge from "@/components/ui/badge";
import EmptyState from "@/components/ui/empty-state";
import type {
  SearchResults as SearchResultsType,
  DogShowEvent,
  PaginatedResponse,
} from "@/lib/types";

interface SearchResultsProps {
  results: SearchResultsType | null;
  events?: PaginatedResponse<DogShowEvent> | null;
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function SearchResults({ results, events }: SearchResultsProps) {
  const judges = results?.results.judges;
  const dogs = results?.results.dogs;
  const hasResults =
    (events?.data.length || 0) +
      (judges?.data.length || 0) +
      (dogs?.data.length || 0) >
    0;

  if (!hasResults) {
    return (
      <EmptyState
        title="No results found"
        message={`No results found for "${results?.query ?? ""}". Try a different search term.`}
      />
    );
  }

  return (
    <div className="space-y-10">
      {events && events.data.length > 0 && (
        <section>
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Events ({events.meta.total})
          </h2>
          <div className="space-y-3">
            {events.data.map((event) => (
              <Link
                key={`${event.date}-${event.slug}`}
                href={`/events/${event.date}/${event.slug}`}
                className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-5 py-4 transition hover:shadow-md"
              >
                <div>
                  <h3 className="font-semibold text-gray-900">{event.name}</h3>
                  <div className="mt-1 flex flex-wrap gap-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar size={13} />
                      {formatDate(event.date)}
                    </span>
                    {event.location && (
                      <span className="flex items-center gap-1">
                        <MapPin size={13} />
                        {event.location}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Trophy size={13} />
                      {event.show_count} {event.show_count === 1 ? "show" : "shows"} &middot;{" "}
                      {event.total_entries} entries
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {judges && judges.data.length > 0 && (
        <section>
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Judges ({judges.meta.total})
          </h2>
          <div className="space-y-3">
            {judges.data.map((judge) => (
              <Link
                key={judge.id}
                href={`/judges/${judge.slug}`}
                className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-5 py-4 transition hover:shadow-md"
              >
                <div>
                  <h3 className="font-semibold text-gray-900">{judge.name}</h3>
                  <div className="mt-1 flex flex-wrap gap-3 text-sm text-gray-500">
                    {judge.show_count != null && (
                      <span className="flex items-center gap-1">
                        <Trophy size={13} />
                        {judge.show_count} shows
                      </span>
                    )}
                  </div>
                </div>
                {judge.specialties && judge.specialties.length > 0 && (
                  <div className="flex gap-1.5">
                    {judge.specialties.slice(0, 2).map((s) => (
                      <Badge key={s} variant="primary">
                        {s}
                      </Badge>
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

      {dogs && dogs.data.length > 0 && (
        <section>
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Dogs ({dogs.meta.total})
          </h2>
          <div className="space-y-3">
            {dogs.data.map((dog) => (
              <Link
                key={dog.id}
                href={`/dogs/${dog.slug}`}
                className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-5 py-4 transition hover:shadow-md"
              >
                <div>
                  <h3 className="font-semibold text-gray-900">{dog.name}</h3>
                  <div className="mt-1 flex flex-wrap gap-3 text-sm text-gray-500">
                    {dog.call_name && (
                      <span>&ldquo;{dog.call_name}&rdquo;</span>
                    )}
                    {dog.owner && (
                      <span className="flex items-center gap-1">
                        <User size={13} />
                        {dog.owner}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge variant="primary">{dog.breed}</Badge>
                  {dog.sex && <Badge variant="default">{dog.sex}</Badge>}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
