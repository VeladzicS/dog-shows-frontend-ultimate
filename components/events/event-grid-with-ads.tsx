import EventCard from "@/components/events/event-card";
import AdSlot from "@/components/ui/ad-slot";
import type { DogShowEvent } from "@/lib/types";

interface EventGridWithAdsProps {
  events: DogShowEvent[];
  /** Insert an inline ad after every N cards (0 = no inline ads) */
  adEveryN?: number;
}

export default function EventGridWithAds({
  events,
  adEveryN = 0,
}: EventGridWithAdsProps) {
  if (adEveryN <= 0) {
    return (
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
        {events.map((event) => (
          <EventCard key={`${event.date}-${event.slug}`} event={event} />
        ))}
      </div>
    );
  }

  // Split events into chunks of adEveryN
  const chunks: DogShowEvent[][] = [];
  for (let i = 0; i < events.length; i += adEveryN) {
    chunks.push(events.slice(i, i + adEveryN));
  }

  return (
    <div className="space-y-6">
      {chunks.map((chunk, idx) => (
        <div key={idx}>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
            {chunk.map((event) => (
              <EventCard key={`${event.date}-${event.slug}`} event={event} />
            ))}
          </div>
          {idx < chunks.length - 1 && (
            <div className="mt-6 flex justify-center">
              <AdSlot variant="inline" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
