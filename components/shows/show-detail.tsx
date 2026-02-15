import Link from "next/link";
import { Calendar, MapPin, User, Award } from "lucide-react";
import Badge from "@/components/ui/badge";
import ShowEntriesTable from "@/components/events/show-entries-table";
import BackButton from "@/components/ui/back-button";
import type { DogShow } from "@/lib/types";

interface ShowDetailProps {
  show: DogShow;
}

export default function ShowDetail({ show }: ShowDetailProps) {
  return (
    <div>
      <BackButton className="mb-6" />

      <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6">
        <h1 className="mb-3 text-3xl font-bold text-gray-900">
          {show.show_name}
        </h1>

        <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1.5">
            <Calendar size={15} />
            {show.show_date_formatted}
          </span>
          {/* <span className="flex items-center gap-1.5">
            <MapPin size={15} />
            {show.location}
          </span> */}
          <span className="flex items-center gap-1.5">
            <User size={15} />
            Judge:{" "}
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
          </span>
          <span className="flex items-center gap-1.5">
            <Award size={15} />
            {show.entry_count} entries
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="primary">{show.breed}</Badge>
          <Badge variant="secondary">{show.show_type}</Badge>
        </div>
      </div>

      {show.entries && show.entries.length > 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white">
          <div className="border-b border-gray-100 px-6 py-4">
            <h2 className="text-lg font-bold text-gray-900">Show Entries</h2>
          </div>
          <ShowEntriesTable entries={show.entries} />
        </div>
      ) : (
        <p className="py-8 text-center text-sm text-gray-400">
          No entry data available.
        </p>
      )}

      {process.env.NODE_ENV === "development" && show.source_url && (
        <div className="mt-4 rounded-lg border border-dashed border-gray-300 bg-gray-50 px-4 py-2 text-xs text-gray-400">
          Source:{" "}
          <a
            href={show.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline break-all"
          >
            {show.source_url}
          </a>
        </div>
      )}
    </div>
  );
}
