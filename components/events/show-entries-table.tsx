import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { ShowEntry } from "@/lib/types";

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
            <div className="border-t border-gray-100 bg-gray-50 px-6 py-2">
              <h3 className="text-sm font-semibold text-gray-700">
                {className}
              </h3>
            </div>
          )}
          <table className="w-full table-fixed text-left text-sm">
            <colgroup>
              <col className="w-[8%]" />
              <col className="w-[14%]" />
              <col className="w-[30%]" />
              <col className="hidden w-[22%] md:table-column" />
              <col className="hidden w-[26%] lg:table-column" />
            </colgroup>
            <thead>
              <tr className="border-b border-gray-100 text-xs uppercase text-gray-400">
                <th className="px-6 py-2 font-medium">Entry</th>
                <th className="px-6 py-2 font-medium">Place</th>
                <th className="px-6 py-2 font-medium">Dog</th>
                <th className="hidden px-6 py-2 font-medium md:table-cell">
                  Owner
                </th>
                <th className="hidden px-6 py-2 font-medium lg:table-cell">
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
                  <td className="whitespace-nowrap px-6 py-2.5 text-gray-500">
                    {entry.entry_number || ""}
                  </td>
                  <td className="whitespace-nowrap px-6 py-2.5 font-medium text-gray-900">
                    {entry.placement || ""}
                  </td>
                  <td className="break-words px-6 py-2.5 text-gray-700">
                    <Highlight text={entry.dog_name} query={highlight} />
                  </td>
                  <td className="hidden break-words px-6 py-2.5 text-gray-500 md:table-cell">
                    <Highlight text={entry.owner || "—"} query={highlight} />
                  </td>
                  <td className="hidden break-words px-6 py-2.5 text-gray-500 lg:table-cell">
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
