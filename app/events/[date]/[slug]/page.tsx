import { notFound } from "next/navigation";
import { getEvent, getEventSummary, getEvents } from "@/lib/data/events";
import EventDetail from "@/components/events/event-detail";
import PageHeader from "@/components/ui/page-header";
import type { Metadata } from "next";
import type { BreedStat, EventShow } from "@/lib/types";

const SPECIAL_BREED_NAMES = [
  "JUNIOR SHOWMANSHIP COMPETITION",
  "BEST IN SHOW",
  "RESERVE BEST IN SHOW",
];

const NON_BREED_SHOW_TYPES = ["OBEDIENCE", "RALLY", "GROUP_BIS"];

function isSpecialBreed(breed: BreedStat): boolean {
  if (SPECIAL_BREED_NAMES.includes(breed.name)) return true;
  // Any breed name containing "GROUP" (e.g., "SPORTING GROUP", "HERDING GROUP")
  if (breed.name.endsWith(" GROUP")) return true;
  if (!breed.show_types || breed.show_types.length === 0) return false;
  return breed.show_types.every((t) => NON_BREED_SHOW_TYPES.includes(t));
}

interface EventPageProps {
  params: Promise<{ date: string; slug: string }>;
  searchParams: Promise<{ breed?: string; search?: string }>;
}

export async function generateStaticParams() {
  try {
    const res = await getEvents({ per_page: 100 });
    return res.data.map((event) => ({
      date: event.date,
      slug: event.slug,
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  const { date, slug } = await params;
  try {
    const { data: summary } = await getEventSummary(date, slug);
    return {
      title: `${summary.name} | Dog Show Results`,
      description: `${summary.name} in ${summary.location} — ${summary.show_count} shows, ${summary.total_entries} entries.`,
    };
  } catch {
    return { title: "Event | Dog Show Results" };
  }
}

export default async function EventPage({
  params,
  searchParams,
}: EventPageProps) {
  const { date, slug } = await params;
  const { breed, search } = await searchParams;

  let summary;
  try {
    const res = await getEventSummary(date, slug);
    summary = res.data;
  } catch {
    notFound();
  }

  // Separate special (non-breed) shows from regular breed shows
  const specialBreeds = summary.breeds.filter(isSpecialBreed);
  const regularBreeds = summary.breeds.filter((b) => !isSpecialBreed(b));

  const isSingleBreed = regularBreeds.length === 1 && specialBreeds.length === 0;
  const activeBreed = breed || (isSingleBreed ? regularBreeds[0].name : undefined);

  // Fetch show results when a breed or special show is selected
  let shows: EventShow[] = [];
  if (activeBreed) {
    try {
      const res = await getEvent(date, slug, {
        breed: activeBreed,
        search: search?.trim() || undefined,
      });
      shows = res.data.shows;
    } catch {
      notFound();
    }
  }

  const basePath = `/events/${date}/${slug}`;
  const highlight = search?.trim() || undefined;

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="container-screen px-4 py-10">
        <PageHeader
          breadcrumbs={[
            { label: "Events", href: "/" },
            { label: summary.name, href: activeBreed ? basePath : undefined },
            ...(activeBreed ? [{ label: activeBreed }] : []),
          ]}
        />
        <EventDetail
          event={{
            name: summary.name,
            date: summary.date,
            show_count: summary.show_count,
            total_entries: summary.total_entries,
          }}
          basePath={basePath}
          breeds={regularBreeds}
          specialBreeds={specialBreeds}
          selectedBreed={activeBreed}
          shows={shows}
          highlight={highlight}
        />
      </div>
    </div>
  );
}
