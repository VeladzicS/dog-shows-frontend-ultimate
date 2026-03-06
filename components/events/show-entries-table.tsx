import { type ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ShowEntry } from "@/lib/types";
import DogImageSlideshow from "@/components/ui/dog-image-slideshow";

interface ShowEntriesTableProps {
  entries: ShowEntry[];
  className?: string;
  highlight?: string;
}

function Highlight({ text, query }: { text: string; query?: string }): ReactNode {
  if (!query || !text) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-yellow-200/80 text-inherit rounded-sm px-0.5">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
}

export default function ShowEntriesTable({
  entries,
  className,
  highlight,
}: ShowEntriesTableProps) {
  const grouped = groupByClass(entries);

  return (
    <div className={cn("overflow-x-auto", className)}>
      {Object.entries(grouped).map(([className, classEntries]) => (
        <div key={className}>
          {className !== "ungrouped" && (
            <div className="border-t border-gray-100 bg-gray-50 px-2 py-2 md:px-6">
              <h3 className="text-sm font-semibold text-gray-700">
                {className}
              </h3>
            </div>
          )}
          <table className="w-full table-auto text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-xs uppercase text-gray-400">
                <th className="w-6 py-2 pl-2 pr-0 font-medium md:w-8 md:pl-6 md:pr-1">Entry</th>
                <th className="py-2 px-2 font-medium md:px-4">Place</th>
                <th className="py-2 px-2 font-medium md:px-4">Dog</th>
                <th className="hidden py-2 px-2 font-medium md:table-cell md:px-4">
                  Owner
                </th>
                <th className="hidden py-2 px-2 pr-4 font-medium lg:table-cell md:px-4 md:pr-6">
                  Handler / Breeder
                </th>
              </tr>
            </thead>
            <tbody>
              {classEntries.map((entry, i) => (
                <tr
                  key={`${entry.dog_name}-${i}`}
                  className="border-b border-gray-50 last:border-0"
                >
                  <td className="w-6 whitespace-nowrap py-2.5 pl-2 pr-0 text-gray-500 md:w-8 md:pl-6 md:pr-1">
                    {entry.entry_number || ""}
                  </td>
                  <td className="whitespace-nowrap py-2.5 px-2 font-medium text-gray-900 md:px-4">
                    {entry.placement || ""}
                  </td>
                  <td className="break-words py-2.5 px-2 text-gray-700 md:px-4">
                    <DogNameCell entry={entry} highlight={highlight} />
                  </td>
                  <td className="hidden break-words py-2.5 px-2 text-gray-500 md:table-cell md:px-4">
                    <Highlight text={entry.owner || "—"} query={highlight} />
                  </td>
                  <td className="hidden break-words py-2.5 px-2 pr-4 text-gray-500 lg:table-cell md:px-4 md:pr-6">
                    <Highlight text={formatHandlerBreeder(entry)} query={highlight} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

function getEntryImages(entry: ShowEntry): { url: string; caption?: string }[] {
  const images: { url: string; caption?: string }[] = [];
  // main image (dog_image_url) is only for avatar/dog page, not show results
  if (entry.dog_gallery) images.push(...entry.dog_gallery);
  return images;
}

function DogNameCell({ entry, highlight }: { entry: ShowEntry; highlight?: string }) {
  const images = getEntryImages(entry);
  const nameEl = entry.dog_slug ? (
    <Link href={`/dogs/${entry.dog_slug}`} prefetch={false} className="text-primary hover:underline">
      <Highlight text={entry.dog_name} query={highlight} />
    </Link>
  ) : (
    <Highlight text={entry.dog_name} query={highlight} />
  );

  if (images.length === 0) return nameEl;

  return (
    <div className="flex flex-col gap-1.5 py-1">
      <DogImageSlideshow images={images} name={entry.dog_name} />
      {nameEl}
    </div>
  );
}

function formatHandlerBreeder(entry: ShowEntry): string {
  const { handler, breeder } = entry;
  if (handler && breeder) return `${handler} / ${breeder}`;
  return handler || breeder || "—";
}

function groupByClass(entries: ShowEntry[]): Record<string, ShowEntry[]> {
  const groups: Record<string, ShowEntry[]> = {};
  for (const entry of entries) {
    const key = entry.class_name || "ungrouped";
    if (!groups[key]) groups[key] = [];
    groups[key].push(entry);
  }
  return groups;
}
