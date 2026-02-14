import Link from "next/link";
import { Trophy, MapPin, Calendar } from "lucide-react";
import Card from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { DogShowEvent } from "@/lib/types";

interface EventCardProps {
  event: DogShowEvent;
  className?: string;
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function EventCard({ event, className }: EventCardProps) {
  return (
    <Link href={`/events/${event.date}/${event.slug}`}>
      <Card className={cn("relative h-full", className)}>
        <div className="absolute top-4 right-4 flex flex-col items-end gap-1.5">
          <span className="flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
            <Calendar size={12} />
            {formatDate(event.date)}
          </span>
          {event.location && (
            <span className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-gray-800">
              <MapPin size={12} />
              {event.location}
            </span>
          )}
        </div>

        <h3 className="mb-2 pr-48 text-lg font-bold text-gray-900">
          {event.name}
        </h3>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Trophy size={14} />
          <span>
            {event.show_count} {event.show_count === 1 ? "show" : "shows"} &middot;{" "}
            {event.total_entries} entries
          </span>
        </div>
      </Card>
    </Link>
  );
}
