import Link from "next/link";
import { Calendar } from "lucide-react";
import Badge from "@/components/ui/badge";
import Pagination from "@/components/ui/pagination";
import type { DogShow, PaginationMeta } from "@/lib/types";

interface JudgeShowsProps {
  shows: DogShow[];
  meta: PaginationMeta;
  slug: string;
}

export default function JudgeShows({ shows, meta, slug }: JudgeShowsProps) {
  if (shows.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-gray-400">
        No show history available.
      </p>
    );
  }

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900">Show History</h2>

      <div className="space-y-3">
        {shows.map((show) => (
          <Link
            key={show.id}
            href={`/shows/${show.id}`}
            className="flex md:items-center gap-2 md:gap-1 md:flex-row flex-col justify-between rounded-xl border border-gray-200 bg-white px-5 py-4 transition hover:shadow-md"
          >
            <div>
              <h3 className="font-semibold text-gray-900">{show.show_name}</h3>
              <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar size={13} />
                  {show.show_date_formatted}
                </span>
                {/* <span className="flex items-center gap-1">
                  <MapPin size={13} />
                  {show.location}
                </span> */}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="primary">{show.breed}</Badge>
              <Badge variant="secondary">{show.show_type}</Badge>
            </div>
          </Link>
        ))}
      </div>

      <Pagination
        meta={meta}
        baseUrl={`/judges/${slug}`}
        className="mt-8"
      />
    </div>
  );
}
